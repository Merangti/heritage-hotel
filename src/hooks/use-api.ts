import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import type { BookingRequest, BookingResponse } from "@/routes/api/bookings";

export type ReviewEntry = {
  id: string;
  name: string;
  origin?: string;
  date: string;
  stars?: number;
  body?: string;
  rating?: number;
  content?: string;
};

export type ReviewInput = {
  name: string;
  origin?: string;
  stars?: number;
  body?: string;
  rating?: number;
  content?: string;
};

type Room = {
  key: string;
  name: string;
  type: string;
  capacity: number;
  rate: number;
  total: number;
  booked: number;
  description: string;
};

// ============ Server Functions ============

const getRoomsFn = createServerFn({ method: "GET" }).handler(async () => {
  const ROOMS = [
    {
      key: "suite",
      name: "The Japfü Suite",
      type: "Heritage Suite",
      capacity: 2,
      rate: 18500,
      total: 2,
      booked: 1,
      description: "King bed · private hearth · valley view",
    },
    {
      key: "deluxe",
      name: "Saramati Deluxe",
      type: "Deluxe Room",
      capacity: 2,
      rate: 12500,
      total: 4,
      booked: 2,
      description: "Carved headboard · copper tub",
    },
    {
      key: "double",
      name: "Dzükou Double",
      type: "Double Room",
      capacity: 2,
      rate: 8500,
      total: 6,
      booked: 3,
      description: "Queen bed · pinewood floor",
    },
    {
      key: "twin",
      name: "Dzüleke Twin",
      type: "Twin Room",
      capacity: 2,
      rate: 7500,
      total: 5,
      booked: 4,
      description: "Two singles · garden window",
    },
    {
      key: "single",
      name: "Khonoma Single",
      type: "Single Room",
      capacity: 1,
      rate: 4500,
      total: 4,
      booked: 1,
      description: "Solo loft · reading nook",
    },
  ];
  return ROOMS as Room[];
});

const createBookingFn = createServerFn({ method: "POST" })
  .inputValidator((data: BookingRequest) => data)
  .handler(async ({ data }) => {
    if (!data.roomKey || !data.checkIn || !data.checkOut || !data.name || !data.email) {
      throw new Error("Missing required fields");
    }

    const nights = Math.ceil(
      (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / 86400000,
    );

    if (nights <= 0) {
      throw new Error("Invalid dates");
    }

    const roomRates: Record<string, number> = {
      suite: 18500,
      deluxe: 12500,
      double: 8500,
      twin: 7500,
      single: 4500,
    };

    const totalAmount = nights * (roomRates[data.roomKey] || 10000);

    const response: BookingResponse = {
      id: `booking_${Date.now()}`,
      status: "pending",
      bookingRef: `HH${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      totalAmount,
      nights,
      createdAt: new Date().toISOString(),
    };

    return response;
  });

type AvailabilityParams = {
  checkIn: string;
  checkOut: string;
  guests: number;
};

const getAvailabilityFn = createServerFn({ method: "GET" })
  .inputValidator((data: AvailabilityParams) => data)
  .handler(async ({ data: { checkIn, checkOut, guests } }) => {
    // Deterministic availability calculation
    function calculateAvailability(
      roomKey: string,
      checkInDate: string,
      total: number,
      booked: number,
    ): number {
      if (!checkInDate) return total - booked;
      let h = 0;
      const s = checkInDate + roomKey;
      for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
      const variance = Math.abs(h) % (total + 1);
      return Math.max(0, total - variance);
    }

    const ROOMS = [
      { key: "suite", total: 2, booked: 1, capacity: 2 },
      { key: "deluxe", total: 4, booked: 2, capacity: 2 },
      { key: "double", total: 6, booked: 3, capacity: 2 },
      { key: "twin", total: 5, booked: 4, capacity: 2 },
      { key: "single", total: 4, booked: 1, capacity: 1 },
    ];

    return ROOMS.map((room) => ({
      roomKey: room.key,
      available: calculateAvailability(room.key, checkIn, room.total, room.booked),
      capacity: room.capacity,
      fits: room.capacity >= guests,
    }));
  });

// ============ Rooms Query ============

export function useRooms() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRoomsFn(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// ============ Availability Query ============

export function useAvailability(params: AvailabilityParams) {
  return useQuery({
    queryKey: ["availability", params],
    queryFn: () => getAvailabilityFn({ data: params }),
    enabled: !!params.checkIn && !!params.checkOut,
    staleTime: 1000 * 60, // 1 minute
  });
}

// ============ Bookings Mutations & Queries ============

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booking: BookingRequest) => createBookingFn({ data: booking }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useBooking(bookingId: string | null) {
  // Not used in UI yet, leaving fetch for now or we can implement mock later
  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      const url = new URL("/api/bookings", window.location.origin);
      url.searchParams.set("id", bookingId!);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Booking not found");
      return res.json() as Promise<BookingResponse>;
    },
    enabled: !!bookingId,
  });
}

const getReviewsFn = createServerFn({ method: "GET" }).handler(async () => {
  const mockReviews: ReviewEntry[] = [
    {
      id: "rev_1",
      name: "Arthur & Evelyn",
      origin: "London",
      date: "October 2025",
      stars: 5,
      content:
        "The Japfü Suite was magnificent. Waking up to the mist rolling over the valley with the hearth burning was an experience we will never forget.",
    },
    {
      id: "rev_2",
      name: "Temsüla",
      date: "September 2025",
      rating: 5,
      content:
        "A beautifully curated space that honors Naga heritage without compromising on comfort. The attention to detail in the woodwork is astounding.",
    },
  ];
  return mockReviews;
});

const createReviewFn = createServerFn({ method: "POST" })
  .inputValidator((data: ReviewInput) => data)
  .handler(async ({ data }) => {
    const body = data.body || data.content || "";
    const stars = data.stars || data.rating || 0;

    if (!data.name || !body || !stars) {
      throw new Error("Missing required fields");
    }

    const newReview: ReviewEntry = {
      id: `rev_${Date.now()}`,
      name: data.name,
      origin: data.origin || "Traveller",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      stars,
      body,
    };

    return newReview;
  });

// ============ Reviews Queries & Mutations ============

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviewsFn(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: ReviewInput) => createReviewFn({ data: review }),
    onSuccess: () => {
      // Invalidate reviews cache
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
