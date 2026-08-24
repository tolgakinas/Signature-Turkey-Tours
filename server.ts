import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { TOURS_DATA } from "./src/data/toursData";
import { EXPERIENCES_DATA } from "./src/data/experiencesData";

dotenv.config();

// Initialize in-memory mutable copies of tours and experiences
let mockTours: any[] = JSON.parse(JSON.stringify(TOURS_DATA));
let mockExperiences: any[] = JSON.parse(JSON.stringify(EXPERIENCES_DATA));

// Initialize Gemini client on server side
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

const mockInquiries: any[] = [
  {
    id: "STT-8941",
    fullName: "Lord David & Lady Eleanor Sterling",
    email: "eleanor.sterling@oxford-heritage.co.uk",
    phoneOrWhatsApp: "+44 7700 900342",
    country: "United Kingdom",
    tourName: "10-Day Classic Signature Turkey Tour",
    tourId: "10-day-classic",
    travelDate: "2026-09-14",
    durationDays: 10,
    travelersCount: 2,
    adultsCount: 2,
    childrenCount: 0,
    accommodationTier: "luxury",
    balloonAddon: true,
    bosphorusYachtAddon: true,
    destinationsInterested: ["Istanbul", "Cappadocia", "Ephesus", "Pamukkale"],
    specialRequests: "Celebrating 25th wedding anniversary. Prefer top floor Sultan suite at Ciragan Palace and private cave suite at Museum Hotel. Vegetarian dining options for dinner.",
    estimatedBudgetPerPerson: 7200,
    status: "confirmed",
    assignedAgent: "Aylin Demir (Senior Specialist)",
    depositPaidUSD: 3600,
    totalQuoteUSD: 14400,
    paymentStatus: "partially_paid",
    notes: "VIP champagne welcome ordered for arrival. Senior archaeologist guide assigned.",
    createdAt: "2026-08-20T10:15:00.000Z",
    updatedAt: "2026-08-22T14:30:00.000Z"
  },
  {
    id: "STT-8942",
    fullName: "Dr. Marcus & Sofia Vance",
    email: "marcus.vance@stanford.edu",
    phoneOrWhatsApp: "+1 (650) 498-2000",
    country: "United States",
    tourName: "14-Day Grand Anatolian & Turquoise Coast Odyssey",
    tourId: "14-day-grand-anatolian",
    travelDate: "2026-10-02",
    durationDays: 14,
    travelersCount: 4,
    adultsCount: 4,
    childrenCount: 0,
    accommodationTier: "luxury",
    balloonAddon: true,
    bosphorusYachtAddon: true,
    destinationsInterested: ["Istanbul", "Cappadocia", "Ephesus", "Pamukkale", "Antalya", "Bodrum"],
    specialRequests: "Private yacht charter day cruise around Bodrum peninsula with chef onboard. Private entrance to Ephesus Terrace Houses.",
    estimatedBudgetPerPerson: 8500,
    status: "quoted",
    assignedAgent: "Emre Kaya (Logistics Director)",
    depositPaidUSD: 0,
    totalQuoteUSD: 34000,
    paymentStatus: "pending_quote_approval",
    notes: "Quotation sent on Aug 23. Guest reviewing day-by-day flight itinerary.",
    createdAt: "2026-08-22T08:45:00.000Z",
    updatedAt: "2026-08-23T11:20:00.000Z"
  },
  {
    id: "STT-8943",
    fullName: "James & Chloe Harrison",
    email: "j.harrison@sydneyventures.com.au",
    phoneOrWhatsApp: "+61 412 899 443",
    country: "Australia",
    tourName: "7-Day Imperial Istanbul & Cappadocia Escape",
    tourId: "7-day-istanbul-cappadocia",
    travelDate: "2026-09-28",
    durationDays: 7,
    travelersCount: 2,
    adultsCount: 2,
    childrenCount: 0,
    accommodationTier: "comfort",
    balloonAddon: true,
    bosphorusYachtAddon: false,
    destinationsInterested: ["Istanbul", "Cappadocia"],
    specialRequests: "Sunrise deluxe balloon flight is top priority. Early check-in requested for Istanbul arrival.",
    estimatedBudgetPerPerson: 3600,
    status: "contacted",
    assignedAgent: "Selin Ozturk",
    depositPaidUSD: 0,
    totalQuoteUSD: 7200,
    paymentStatus: "unpaid",
    notes: "WhatsApp initial consultation completed. Preparing tailored proposal.",
    createdAt: "2026-08-23T14:10:00.000Z",
    updatedAt: "2026-08-23T16:00:00.000Z"
  },
  {
    id: "STT-8944",
    fullName: "Tariq & Fatima Al-Mansoor",
    email: "tariq.almansoor@emiratesgroup.ae",
    phoneOrWhatsApp: "+971 50 442 8190",
    country: "United Arab Emirates",
    tourName: "8-Day Turquoise Coast Private Gulet & Lycian Way",
    tourId: "8-day-turquoise-gulet",
    travelDate: "2026-09-08",
    durationDays: 8,
    travelersCount: 6,
    adultsCount: 4,
    childrenCount: 2,
    accommodationTier: "luxury",
    balloonAddon: false,
    bosphorusYachtAddon: true,
    destinationsInterested: ["Fethiye", "Bodrum", "Antalya", "Istanbul"],
    specialRequests: "Exclusive private luxury Turkish Gulet charter with halal dining and family water sports equipment.",
    estimatedBudgetPerPerson: 6500,
    status: "confirmed",
    assignedAgent: "Mehmet Yilmaz (Riviera Lead)",
    depositPaidUSD: 19500,
    totalQuoteUSD: 39000,
    paymentStatus: "partially_paid",
    notes: "Private Gulet 'Sultan of the Seas' reserved out of Gocek marina.",
    createdAt: "2026-08-18T16:20:00.000Z",
    updatedAt: "2026-08-21T09:15:00.000Z"
  },
  {
    id: "STT-8945",
    fullName: "Professor Hiroshi & Keiko Tanaka",
    email: "htanaka@kyoto-u.ac.jp",
    phoneOrWhatsApp: "+81 90 3120 4881",
    country: "Japan",
    tourName: "12-Day Mesopotamian Roots & Anatolian Archaeology",
    tourId: "12-day-mesopotamia-gobeklitepe",
    travelDate: "2026-10-18",
    durationDays: 12,
    travelersCount: 2,
    adultsCount: 2,
    childrenCount: 0,
    accommodationTier: "comfort",
    balloonAddon: false,
    bosphorusYachtAddon: false,
    destinationsInterested: ["Istanbul", "Sanliurfa", "Gobeklitepe", "Mardin", "Nemrut"],
    specialRequests: "Focus heavily on Göbeklitepe and Karahantepe excavation sites. Need expert English or Japanese speaking archaeologist.",
    estimatedBudgetPerPerson: 5200,
    status: "new",
    assignedAgent: "Unassigned",
    depositPaidUSD: 0,
    totalQuoteUSD: 10400,
    paymentStatus: "unpaid",
    notes: "New inquiry arrived via website form. Needs archaeologist guide check.",
    createdAt: "2026-08-24T00:30:00.000Z",
    updatedAt: "2026-08-24T00:30:00.000Z"
  },
  {
    id: "STT-8946",
    fullName: "Catherine & Robert Dupont",
    email: "catherine.dupont@paris-avocats.fr",
    phoneOrWhatsApp: "+33 6 12 34 56 78",
    country: "France",
    tourName: "10-Day Classic Signature Turkey Tour",
    tourId: "10-day-classic",
    travelDate: "2026-10-10",
    durationDays: 10,
    travelersCount: 2,
    adultsCount: 2,
    childrenCount: 0,
    accommodationTier: "luxury",
    balloonAddon: true,
    bosphorusYachtAddon: true,
    destinationsInterested: ["Istanbul", "Cappadocia", "Ephesus", "Pamukkale"],
    specialRequests: "Wine tasting in Urgup and Cappadocia sunset valley picnic with Turkish mezze.",
    estimatedBudgetPerPerson: 6900,
    status: "quoted",
    assignedAgent: "Aylin Demir (Senior Specialist)",
    depositPaidUSD: 0,
    totalQuoteUSD: 13800,
    paymentStatus: "pending_quote_approval",
    notes: "Luxury cave suite options sent via PDF proposal.",
    createdAt: "2026-08-21T12:00:00.000Z",
    updatedAt: "2026-08-23T15:45:00.000Z"
  }
];

// Balloon fleet & slot status
let mockBalloonSlots = [
  { id: 'bs-1', date: '2026-09-15', provider: 'Royal Balloon Cappadocia', totalSlots: 16, bookedSlots: 14, weatherStatus: 'green', pilotAssigned: 'Captain Tolga', takeoffValley: 'Rose Valley' },
  { id: 'bs-2', date: '2026-09-16', provider: 'Butterfly Balloons', totalSlots: 12, bookedSlots: 12, weatherStatus: 'green', pilotAssigned: 'Captain Ali', takeoffValley: 'Love Valley' },
  { id: 'bs-3', date: '2026-09-17', provider: 'Voyager Balloons', totalSlots: 16, bookedSlots: 8, weatherStatus: 'green', pilotAssigned: 'Captain Mehmet', takeoffValley: 'Goreme National Park' },
  { id: 'bs-4', date: '2026-09-18', provider: 'Royal Balloon Cappadocia', totalSlots: 14, bookedSlots: 10, weatherStatus: 'yellow', pilotAssigned: 'Captain Burak', takeoffValley: 'Pigeon Valley' },
  { id: 'bs-5', date: '2026-09-19', provider: 'Kapadokya Balloons', totalSlots: 12, bookedSlots: 4, weatherStatus: 'green', pilotAssigned: 'Captain Hasan', takeoffValley: 'Sword Valley' }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Signature Turkey Tours API" });
  });

  // Submit booking inquiry
  app.post("/api/inquiries", (req, res) => {
    try {
      const budget = req.body.estimatedBudgetPerPerson || 
        (req.body.accommodationTier === 'luxury' ? 6800 : req.body.accommodationTier === 'comfort' ? 4500 : 3200);
      const travelers = req.body.travelersCount || 2;
      const totalQuote = budget * travelers;

      const inquiry = {
        id: "STT-" + Math.floor(1000 + Math.random() * 9000),
        fullName: req.body.fullName,
        email: req.body.email,
        phoneOrWhatsApp: req.body.phoneOrWhatsApp,
        country: req.body.country || "International",
        tourName: req.body.tourName || "Tailor-Made Turkish Journey",
        tourId: req.body.tourId || "custom-itinerary",
        travelDate: req.body.travelDate || "2026-10-01",
        durationDays: req.body.durationDays || 10,
        travelersCount: travelers,
        adultsCount: req.body.adultsCount || travelers,
        childrenCount: req.body.childrenCount || 0,
        accommodationTier: req.body.accommodationTier || "comfort",
        balloonAddon: !!req.body.balloonAddon,
        bosphorusYachtAddon: !!req.body.bosphorusYachtAddon,
        destinationsInterested: req.body.destinationsInterested || ["Istanbul", "Cappadocia"],
        specialRequests: req.body.specialRequests || "",
        estimatedBudgetPerPerson: budget,
        status: "new",
        assignedAgent: "Unassigned",
        depositPaidUSD: 0,
        totalQuoteUSD: totalQuote,
        paymentStatus: "unpaid",
        notes: "Inquiry submitted online via booking form.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockInquiries.unshift(inquiry);
      console.log("New booking inquiry received:", inquiry.id, inquiry.fullName, inquiry.tourName);
      res.json({
        success: true,
        referenceId: inquiry.id,
        message: "Thank you! Our Turkey Travel Specialist will contact you via WhatsApp & Email within 2 hours with your tailored quotation.",
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to process inquiry" });
    }
  });

  // ================= ADMIN API ENDPOINTS =================

  // 1. Get all inquiries with search, filter, and sorting
  app.get("/api/admin/inquiries", (req, res) => {
    try {
      const { status, search, tier, tourId, sortBy = "createdAt", sortOrder = "desc" } = req.query;
      let results = [...mockInquiries];

      if (status && status !== "all") {
        results = results.filter((item) => item.status === status);
      }

      if (tier && tier !== "all") {
        results = results.filter((item) => item.accommodationTier === tier);
      }

      if (tourId && tourId !== "all") {
        results = results.filter((item) => item.tourId === tourId);
      }

      if (search) {
        const query = String(search).toLowerCase();
        results = results.filter(
          (item) =>
            item.fullName?.toLowerCase().includes(query) ||
            item.email?.toLowerCase().includes(query) ||
            item.id?.toLowerCase().includes(query) ||
            item.country?.toLowerCase().includes(query) ||
            item.tourName?.toLowerCase().includes(query)
        );
      }

      results.sort((a, b) => {
        const valA = a[String(sortBy)] || "";
        const valB = b[String(sortBy)] || "";
        if (sortOrder === "asc") {
          return valA > valB ? 1 : -1;
        }
        return valA < valB ? 1 : -1;
      });

      res.json({
        success: true,
        count: results.length,
        inquiries: results,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to fetch admin inquiries" });
    }
  });

  // 2. Create manual inquiry / booking lead
  app.post("/api/admin/inquiries", (req, res) => {
    try {
      const data = req.body;
      const budget = Number(data.estimatedBudgetPerPerson) || 4500;
      const travelers = Number(data.travelersCount) || 2;
      const totalQuote = Number(data.totalQuoteUSD) || budget * travelers;

      const newLead = {
        id: "STT-" + Math.floor(1000 + Math.random() * 9000),
        fullName: data.fullName || "Private VIP Guest",
        email: data.email || "guest@signatureturkeytours.com",
        phoneOrWhatsApp: data.phoneOrWhatsApp || "",
        country: data.country || "United States",
        tourName: data.tourName || "10-Day Classic Signature Turkey Tour",
        tourId: data.tourId || "10-day-classic",
        travelDate: data.travelDate || "2026-10-15",
        durationDays: Number(data.durationDays) || 10,
        travelersCount: travelers,
        adultsCount: Number(data.adultsCount) || travelers,
        childrenCount: Number(data.childrenCount) || 0,
        accommodationTier: data.accommodationTier || "luxury",
        balloonAddon: !!data.balloonAddon,
        bosphorusYachtAddon: !!data.bosphorusYachtAddon,
        destinationsInterested: Array.isArray(data.destinationsInterested) ? data.destinationsInterested : ["Istanbul", "Cappadocia"],
        specialRequests: data.specialRequests || "",
        estimatedBudgetPerPerson: budget,
        status: data.status || "new",
        assignedAgent: data.assignedAgent || "Aylin Demir (Senior Specialist)",
        depositPaidUSD: Number(data.depositPaidUSD) || 0,
        totalQuoteUSD: totalQuote,
        paymentStatus: data.paymentStatus || (Number(data.depositPaidUSD) > 0 ? "partially_paid" : "unpaid"),
        notes: data.notes || "Lead created directly in Admin Dashboard.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockInquiries.unshift(newLead);
      res.json({ success: true, lead: newLead, message: "New booking lead created successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to create lead" });
    }
  });

  // 3. Update inquiry status, agent, quote, or notes
  app.patch("/api/admin/inquiries/:id", (req, res) => {
    try {
      const { id } = req.params;
      const index = mockInquiries.findIndex((item) => item.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Booking inquiry not found" });
      }

      mockInquiries[index] = {
        ...mockInquiries[index],
        ...req.body,
        updatedAt: new Date().toISOString(),
      };

      res.json({
        success: true,
        lead: mockInquiries[index],
        message: `Booking lead #${id} updated successfully`,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to update lead" });
    }
  });

  // 4. Delete booking inquiry
  app.delete("/api/admin/inquiries/:id", (req, res) => {
    try {
      const { id } = req.params;
      const index = mockInquiries.findIndex((item) => item.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Booking inquiry not found" });
      }
      const removed = mockInquiries.splice(index, 1);
      res.json({ success: true, removed: removed[0], message: "Inquiry removed" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to delete lead" });
    }
  });

  // 5. Admin Aggregated Analytics & Stats
  app.get("/api/admin/stats", (_req, res) => {
    try {
      const totalInquiries = mockInquiries.length;
      const confirmedCount = mockInquiries.filter((i) => i.status === "confirmed" || i.status === "completed").length;
      const activeLeadsCount = mockInquiries.filter((i) => i.status === "new" || i.status === "contacted" || i.status === "quoted").length;
      
      const totalPipelineValue = mockInquiries.reduce((acc, curr) => acc + (curr.totalQuoteUSD || 0), 0);
      const confirmedRevenue = mockInquiries
        .filter((i) => i.status === "confirmed" || i.status === "completed")
        .reduce((acc, curr) => acc + (curr.totalQuoteUSD || 0), 0);
      const depositsCollected = mockInquiries.reduce((acc, curr) => acc + (curr.depositPaidUSD || 0), 0);

      const conversionRate = totalInquiries > 0 ? ((confirmedCount / totalInquiries) * 100).toFixed(1) : "0";
      const avgBookingValue = confirmedCount > 0 ? Math.round(confirmedRevenue / confirmedCount) : 6400;

      // Tier Breakdown
      const tierCounts = {
        luxury: mockInquiries.filter((i) => i.accommodationTier === "luxury").length,
        comfort: mockInquiries.filter((i) => i.accommodationTier === "comfort").length,
        classic: mockInquiries.filter((i) => i.accommodationTier === "classic").length,
      };

      // Destination interest breakdown
      const destinationPopularity: Record<string, number> = {};
      mockInquiries.forEach((item) => {
        if (Array.isArray(item.destinationsInterested)) {
          item.destinationsInterested.forEach((dest: string) => {
            destinationPopularity[dest] = (destinationPopularity[dest] || 0) + 1;
          });
        }
      });

      // Monthly revenue simulated breakdown for current fiscal year
      const monthlyRevenue = [
        { month: "Jan", revenueUSD: 38400, bookings: 6 },
        { month: "Feb", revenueUSD: 44200, bookings: 7 },
        { month: "Mar", revenueUSD: 68900, bookings: 11 },
        { month: "Apr", revenueUSD: 94500, bookings: 15 },
        { month: "May", revenueUSD: 128000, bookings: 20 },
        { month: "Jun", revenueUSD: 112400, bookings: 18 },
        { month: "Jul", revenueUSD: 86000, bookings: 14 },
        { month: "Aug", revenueUSD: 98500, bookings: 16 },
        { month: "Sep", revenueUSD: 146000, bookings: 23 },
        { month: "Oct", revenueUSD: 139000, bookings: 22 },
        { month: "Nov", revenueUSD: 74200, bookings: 12 },
        { month: "Dec", revenueUSD: 61800, bookings: 9 },
      ];

      // Top origin countries
      const countryStats = [
        { country: "United States", percentage: 38, count: 42, flag: "🇺🇸" },
        { country: "United Kingdom", percentage: 24, count: 26, flag: "🇬🇧" },
        { country: "Australia & NZ", percentage: 16, count: 18, flag: "🇦🇺" },
        { country: "Canada", percentage: 10, count: 11, flag: "🇨🇦" },
        { country: "UAE & GCC", percentage: 7, count: 8, flag: "🇦🇪" },
        { country: "Other International", percentage: 5, count: 5, flag: "🌍" },
      ];

      res.json({
        success: true,
        stats: {
          totalInquiries,
          confirmedCount,
          activeLeadsCount,
          totalPipelineValue,
          confirmedRevenue,
          depositsCollected,
          conversionRate: `${conversionRate}%`,
          avgBookingValue,
          tursabLicenseNumber: "TÜRSAB 12480-A",
          avgResponseTimeMin: 18,
          guestSatisfactionScore: 4.98,
          tierCounts,
          destinationPopularity,
          monthlyRevenue,
          countryStats,
          balloonSlotsSummary: {
            totalAllocated: 70,
            booked: 48,
            available: 22,
            flightReadiness: "100% Weather Cleared",
          }
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to calculate stats" });
    }
  });

  // 6. Balloon Slots Roster
  app.get("/api/admin/balloons", (_req, res) => {
    res.json({ success: true, slots: mockBalloonSlots });
  });

  // 7. Update balloon slots
  app.post("/api/admin/balloons/update", (req, res) => {
    try {
      const { id, bookedSlots, weatherStatus, pilotAssigned } = req.body;
      const slotIndex = mockBalloonSlots.findIndex((s) => s.id === id);
      if (slotIndex !== -1) {
        mockBalloonSlots[slotIndex] = {
          ...mockBalloonSlots[slotIndex],
          ...(bookedSlots !== undefined && { bookedSlots: Number(bookedSlots) }),
          ...(weatherStatus && { weatherStatus }),
          ...(pilotAssigned && { pilotAssigned }),
        };
        return res.json({ success: true, slot: mockBalloonSlots[slotIndex] });
      }
      res.status(404).json({ error: "Slot not found" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to update slot" });
    }
  });

  // 8. Quick dispatch quotation / WhatsApp notification simulation
  app.post("/api/admin/dispatch-quote", (req, res) => {
    try {
      const { inquiryId, channel, customMessage } = req.body;
      const inquiry = mockInquiries.find((i) => i.id === inquiryId);
      
      if (inquiry) {
        inquiry.status = "quoted";
        inquiry.updatedAt = new Date().toISOString();
      }

      res.json({
        success: true,
        message: `Tailored itinerary quotation dispatched via ${channel || "WhatsApp"} to ${inquiry?.fullName || "Guest"}!`,
        sentAt: new Date().toISOString(),
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to dispatch quote" });
    }
  });

  // ================= TOURS CRUD ENDPOINTS =================

  // 9. Get all tours
  app.get("/api/tours", (_req, res) => {
    res.json({ success: true, tours: mockTours });
  });

  // 10. Get single tour by ID
  app.get("/api/tours/:id", (req, res) => {
    const tour = mockTours.find((t) => t.id === req.params.id);
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.json({ success: true, tour });
  });

  // 11. Create new tour
  app.post("/api/admin/tours", (req, res) => {
    try {
      const newTour = req.body;
      if (!newTour.title) {
        return res.status(400).json({ error: "Tour title is required" });
      }
      
      // Auto-generate ID if missing or sanitize
      const slug = (newTour.title || "custom-tour")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const finalId = newTour.id || `${slug}-${Date.now().toString().slice(-4)}`;

      const sanitizedTour = {
        ...newTour,
        id: finalId,
        durationDays: Number(newTour.durationDays) || 7,
        durationNights: Number(newTour.durationNights) || ((Number(newTour.durationDays) || 7) - 1),
        destinations: Array.isArray(newTour.destinations) ? newTour.destinations : ["Istanbul", "Cappadocia"],
        startingCity: newTour.startingCity || "Istanbul (IST / SAW)",
        endingCity: newTour.endingCity || "Istanbul / Izmir",
        heroImage: newTour.heroImage || "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=80",
        galleryImages: Array.isArray(newTour.galleryImages) && newTour.galleryImages.length > 0
          ? newTour.galleryImages
          : [newTour.heroImage || "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80"],
        overview: newTour.overview || "A privately guided journey through the imperial heritage and landscapes of Turkey.",
        pricePerPersonUSD: {
          classic: Number(newTour.pricePerPersonUSD?.classic) || 2800,
          comfort: Number(newTour.pricePerPersonUSD?.comfort) || 3900,
          luxury: Number(newTour.pricePerPersonUSD?.luxury) || 5800,
        },
        ratings: newTour.ratings || { score: 5.0, reviewCount: 1 },
        highlights: Array.isArray(newTour.highlights) ? newTour.highlights : [],
        included: Array.isArray(newTour.included) ? newTour.included : [
          "Private airport meet & greet with Mercedes VIP transfer",
          "Dedicated licensed English-speaking scholar guide",
          "All domestic flight tickets and baggage allowances",
          "Daily gourmet breakfast + curated lunch tastings",
          "VIP skip-the-line museum admissions"
        ],
        excluded: Array.isArray(newTour.excluded) ? newTour.excluded : [
          "International flights",
          "Personal travel insurance",
          "Hot air balloon flight (available as signature add-on)"
        ],
        itinerary: Array.isArray(newTour.itinerary) ? newTour.itinerary : [],
        recommendedSeason: newTour.recommendedSeason || "April – November",
        idealFor: Array.isArray(newTour.idealFor) ? newTour.idealFor : ["Couples", "Culture Lovers", "Private Groups"],
        physicalRating: newTour.physicalRating || "Moderate",
      };

      mockTours.unshift(sanitizedTour);
      res.json({ success: true, tour: sanitizedTour, message: "Tour created successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to create tour" });
    }
  });

  // 12. Update existing tour
  app.put("/api/admin/tours/:id", (req, res) => {
    try {
      const { id } = req.params;
      const index = mockTours.findIndex((t) => t.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Tour not found" });
      }

      const updated = {
        ...mockTours[index],
        ...req.body,
        id, // keep original id
      };

      mockTours[index] = updated;
      res.json({ success: true, tour: updated, message: "Tour updated successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to update tour" });
    }
  });

  // 13. Delete tour
  app.delete("/api/admin/tours/:id", (req, res) => {
    try {
      const { id } = req.params;
      const index = mockTours.findIndex((t) => t.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Tour not found" });
      }
      const removed = mockTours.splice(index, 1);
      res.json({ success: true, removed: removed[0], message: "Tour deleted successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to delete tour" });
    }
  });

  // 14. Reset tours to default
  app.post("/api/admin/tours/reset", (_req, res) => {
    mockTours = JSON.parse(JSON.stringify(TOURS_DATA));
    res.json({ success: true, tours: mockTours, message: "Tours reset to default signature packages" });
  });

  // ================= DESIGN EXCURSIONS / EXPERIENCES CRUD ENDPOINTS =================

  // 15. Get all design excursions / signature experiences
  app.get("/api/experiences", (_req, res) => {
    res.json({ success: true, experiences: mockExperiences });
  });

  // 16. Get single experience by ID
  app.get("/api/experiences/:id", (req, res) => {
    const exp = mockExperiences.find((e) => e.id === req.params.id);
    if (!exp) {
      return res.status(404).json({ error: "Excursion not found" });
    }
    res.json({ success: true, experience: exp });
  });

  // 17. Create new design excursion
  app.post("/api/admin/experiences", (req, res) => {
    try {
      const newExp = req.body;
      if (!newExp.title) {
        return res.status(400).json({ error: "Excursion title is required" });
      }

      const slug = (newExp.title || "custom-experience")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const finalId = newExp.id || `${slug}-${Date.now().toString().slice(-4)}`;

      const sanitizedExp = {
        ...newExp,
        id: finalId,
        title: newExp.title,
        location: newExp.location || "Turkey",
        duration: newExp.duration || "2 Hours",
        priceUSD: Number(newExp.priceUSD) || 150,
        badge: newExp.badge || "Signature Experience",
        image: newExp.image || "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80",
        description: newExp.description || "A curated bespoke Turkish design excursion.",
        included: Array.isArray(newExp.included) ? newExp.included : [
          "Private local specialist guide",
          "VIP entry and private arrangements",
          "Artisanal refreshments and beverages"
        ],
      };

      mockExperiences.unshift(sanitizedExp);
      res.json({ success: true, experience: sanitizedExp, message: "Design excursion created successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to create design excursion" });
    }
  });

  // 18. Update existing design excursion
  app.put("/api/admin/experiences/:id", (req, res) => {
    try {
      const { id } = req.params;
      const index = mockExperiences.findIndex((e) => e.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Design excursion not found" });
      }

      const updated = {
        ...mockExperiences[index],
        ...req.body,
        id, // preserve id
        priceUSD: Number(req.body.priceUSD) !== undefined && !isNaN(Number(req.body.priceUSD)) ? Number(req.body.priceUSD) : mockExperiences[index].priceUSD,
      };

      mockExperiences[index] = updated;
      res.json({ success: true, experience: updated, message: "Design excursion updated successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to update design excursion" });
    }
  });

  // 19. Delete design excursion
  app.delete("/api/admin/experiences/:id", (req, res) => {
    try {
      const { id } = req.params;
      const index = mockExperiences.findIndex((e) => e.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Design excursion not found" });
      }
      const removed = mockExperiences.splice(index, 1);
      res.json({ success: true, removed: removed[0], message: "Design excursion deleted successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to delete design excursion" });
    }
  });

  // 20. Reset design excursions to default
  app.post("/api/admin/experiences/reset", (_req, res) => {
    mockExperiences = JSON.parse(JSON.stringify(EXPERIENCES_DATA));
    res.json({ success: true, experiences: mockExperiences, message: "Design excursions reset to defaults" });
  });

  // AI Tailored Itinerary Generator Endpoint
  app.post("/api/ai/generate-itinerary", async (req, res) => {
    try {
      const {
        destinations,
        durationDays,
        travelStyle, // 'Classic', 'Comfort', 'Luxury'
        month,
        travelersCount,
        interests,
        pace, // 'Relaxed', 'Moderate', 'Active'
        specialRequests,
      } = req.body;

      const client = getGeminiClient();

      const prompt = `You are the Master Travel Curator & Historian for "Signature Turkey Tours" (TÜRSAB licensed private luxury tour operator).
Create an authentic, meticulously timed, bespoke Turkey private tour itinerary with the following parameters:
- Destinations: ${Array.isArray(destinations) ? destinations.join(", ") : destinations || "Istanbul, Cappadocia, Ephesus, Pamukkale"}
- Duration: ${durationDays || 10} Days
- Travel Style: ${travelStyle || "Comfort"} (Classic 4-Star Boutique, Comfort Superior Heritage, or Luxury Ottoman Sultan Palace/Cave Suites)
- Month/Season: ${month || "May / Autumn"}
- Travelers: ${travelersCount || 2} persons (Private tour)
- Traveler Interests: ${Array.isArray(interests) ? interests.join(", ") : interests || "History, Hot Air Balloon, Local Cuisine, Hidden Gems"}
- Pace: ${pace || "Moderate"}
- Special Notes: ${specialRequests || "None"}

Generate an inspiring title, an evocative executive summary, day-by-day breakdown with Morning, Afternoon, Evening highlights, insider tips, recommended boutique accommodations, culinary pairings, transport logistics (private VIP Mercedes Sprinter / domestic flights), and an estimated cost range per person in USD.

Respond strictly in valid JSON matching this schema:
{
  "tourTitle": "string",
  "tagline": "string",
  "summary": "string",
  "estimatedPriceUSD": {
    "classic": number,
    "comfort": number,
    "luxury": number
  },
  "recommendedMonths": "string",
  "highlightExperiences": ["string"],
  "itineraryDays": [
    {
      "day": number,
      "location": "string",
      "title": "string",
      "morning": "string",
      "afternoon": "string",
      "evening": "string",
      "includedMeals": ["string"],
      "recommendedStay": "string",
      "insiderTip": "string"
    }
  ],
  "logisticsSummary": "string",
  "packingAdvice": "string"
}`;

      const response = await client.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);
      res.json({ success: true, data: parsedData });
    } catch (error: any) {
      console.error("AI Itinerary Generation error:", error);
      // Return a graceful fallback if Gemini key is not configured or fails
      res.json({
        success: true,
        fallback: true,
        data: {
          tourTitle: `${req.body.durationDays || 10}-Day Signature Tailor-Made Turkish Odyssey`,
          tagline: "Privately guided journey through centuries of heritage, surreal landscapes & coastal serenity",
          summary: "A private, hand-curated Turkey journey combining the imperial majesty of Istanbul, fairy chimneys and hot air ballooning in Cappadocia, the mineral travertines of Pamukkale, and the Greco-Roman marvels of Ephesus.",
          estimatedPriceUSD: {
            classic: 3400,
            comfort: 4600,
            luxury: 6900
          },
          recommendedMonths: "April - June & September - November",
          highlightExperiences: [
            "Sunrise Deluxe Hot Air Balloon Flight over Goreme valleys",
            "Private Sunset Cruise on the Bosphorus aboard a private motor yacht",
            "Exclusive access walk through Ancient Ephesus & Terrace Houses",
            "Stay in authentic restored luxury cave suite in Urgup / Uchisar",
            "Thermal springs soak in ancient Hierapolis Cleopatra pool"
          ],
          itineraryDays: [
            {
              day: 1,
              location: "Istanbul",
              title: "Arrival in the City on Two Continents",
              morning: "Private VIP airport meet & greet with Mercedes transfer to your Bosphorus-view boutique hotel.",
              afternoon: "Gentle orientation walk along Karaköy & Galata with Turkish coffee tasting.",
              evening: "Welcome dinner at an authentic Ottoman culinary terrace overlooking the Golden Horn.",
              includedMeals: ["Dinner"],
              recommendedStay: "Bosphorus Heritage Palace or Sultanahmet Boutique Mansion",
              insiderTip: "Enjoy Turkish tea in tulip-shaped glasses while watching the sunset ferry crossings."
            },
            {
              day: 2,
              location: "Istanbul",
              title: "Imperial Ottoman & Byzantine Wonders",
              morning: "Private scholar-led visit to Hagia Sophia and the subterranean Basilica Cistern before crowds.",
              afternoon: "Explore Topkapi Palace Holy Relics & Imperial Harem followed by the Blue Mosque.",
              evening: "Traditional Turkish Hamam ritual followed by rooftop mezze dining.",
              includedMeals: ["Breakfast", "Lunch"],
              recommendedStay: "Sultanahmet Luxury Boutique",
              insiderTip: "Wear slip-on shoes for comfortable entry to historical mosques."
            },
            {
              day: 3,
              location: "Istanbul to Cappadocia",
              title: "Bazaars, Bosphorus Cruise & Flight to Fairy Chimneys",
              morning: "Sensory private walk through the Spice Market and Grand Bazaar with private craft artisans.",
              afternoon: "Private 2-hour private yacht cruise on the Bosphorus Strait. Flight to Cappadocia.",
              evening: "Arrive in Cappadocia; check into your private carved cave suite. Stargazing terrace dinner.",
              includedMeals: ["Breakfast", "Dinner"],
              recommendedStay: "Museum Hotel or Kayakapı Premium Cave Suites",
              insiderTip: "Cave rooms naturally maintain pleasant 18°C temperature year-round."
            },
            {
              day: 4,
              location: "Cappadocia",
              title: "Sunrise Balloon Flight & Goreme Open Air Museum",
              morning: "Dawn hot air balloon flight watching sunrise over volcanic valleys with champagne toast.",
              afternoon: "Explore UNESCO Goreme Open-Air Museum frescoes and Devrent Valley fairy chimneys.",
              evening: "Pottery making masterclass in Avanos and Anatolian clay-pot Testi Kebab dining.",
              includedMeals: ["Breakfast", "Lunch", "Dinner"],
              recommendedStay: "Kayakapı Premium Cave Suites",
              insiderTip: "Bring a light jacket for early dawn balloon launch temperatures."
            },
            {
              day: 5,
              location: "Cappadocia to Pamukkale",
              title: "Underground Cities, Caravanserai & Mineral Terraces",
              morning: "Descend into Kaymakli or Derinkuyu multi-level subterranean underground refuge.",
              afternoon: "Scenic private drive across Silk Road Caravanserai towards Pamukkale.",
              evening: "Check in to your thermal boutique spa hotel; soak in mineral-rich thermal waters.",
              includedMeals: ["Breakfast", "Dinner"],
              recommendedStay: "Doga Thermal Health Boutique Spa",
              insiderTip: "Pack swimwear for the warm soothing thermal waters."
            }
          ],
          logisticsSummary: "All domestic flights, private Mercedes VIP transfers, dedicated English-speaking historian guide, and skip-the-line admissions included.",
          packingAdvice: "Comfortable walking shoes, smart-casual modest attire for mosques, sun protection, and swimwear for thermal pools."
        }
      });
    }
  });

  // AI Concierge Chatbot Endpoint
  app.post("/api/ai/ask-concierge", async (req, res) => {
    try {
      const { message, chatHistory } = req.body;
      const client = getGeminiClient();

      const systemInstruction = `You are Aylin, Senior Private Travel Concierge for "Signature Turkey Tours" (www.signatureturkeytours.com), a premier licensed Turkish tour operator (TÜRSAB #12480-A).
You provide warm, authentic, knowledgeable, and reassuring advice on private traveling in Turkey.
Key company strengths to highlight naturally:
- Fully customized private tours with dedicated licensed historian guides & private VIP Mercedes vehicles.
- Guaranteed best hot air balloon slots with 100% weather safety guarantee and refundable policies.
- Seamless domestic flights and baggage handling.
- Transparent tiered pricing (Classic, Comfort, Luxury) with zero hidden fees.
- 24/7 on-ground WhatsApp concierge assistance in Turkey.
- Direct contact: info@signatureturkeytours.com or WhatsApp +90 532 890 2410.

Keep answers concise (2-4 paragraphs), warm, elegant, accurate, and helpful. Include bullet points when recommending dishes, places, or tips.`;

      const contents: any[] = [];
      if (Array.isArray(chatHistory)) {
        chatHistory.forEach((msg) => {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await client.models.generateContent({
        model: "gemini-3.7-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        success: true,
        reply: response.text || "Hello! It's a pleasure to assist your Turkey travel plans. What destinations or dates are you considering?",
      });
    } catch (error: any) {
      console.error("Concierge Chat Error:", error);
      res.json({
        success: true,
        reply: "Merhaba! Welcome to Signature Turkey Tours. I am here to help you plan an unforgettable private journey through Istanbul, Cappadocia, Ephesus, and the Turkish Riviera. Feel free to ask about custom itineraries, balloon flights, best seasons, or bespoke luxury arrangements!",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Signature Turkey Tours Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
