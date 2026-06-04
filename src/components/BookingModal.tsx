import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateBooking } from "@/hooks/use-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRooms, useAvailability } from "@/hooks/use-api";

export function BookingModal() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"search" | "details" | "confirm">("search");

  // Form state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [selectedRoomKey, setSelectedRoomKey] = useState("");

  // Guest details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Queries & Mutations
  const { data: rooms } = useRooms();
  const { data: availability } = useAvailability({ checkIn, checkOut, guests });
  const { mutate: createBooking, isPending, error } = useCreateBooking();

  // Listen for ledger:open event
  useEffect(() => {
    function handleOpen(e: any) {
      const detail = (e as CustomEvent).detail;
      if (detail?.roomKey) {
        // Pre-fill with room data
        setCheckIn(detail.checkIn || checkIn);
        setCheckOut(detail.checkOut || checkOut);
        setGuests(detail.guests || guests);
        setSelectedRoomKey(detail.roomKey);
        setStep("confirm");
      }
      setOpen(true);
    }

    document.addEventListener("ledger:open", handleOpen);
    return () => document.removeEventListener("ledger:open", handleOpen);
  }, []);

  function handleSearch() {
    if (!checkIn || !checkOut || guests < 1) {
      alert("Please fill in all search fields");
      return;
    }
    setStep("details");
  }

  function handleSelectRoom() {
    if (!selectedRoomKey) {
      alert("Please select a room");
      return;
    }
    setStep("confirm");
  }

  function handleSubmit() {
    if (!name || !email || !phone) {
      alert("Please fill in your details");
      return;
    }

    // Validate dates
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      alert("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    createBooking(
      {
        roomKey: selectedRoomKey,
        checkIn,
        checkOut,
        guests,
        name,
        email,
        phone,
      },
      {
        onSuccess: (booking) => {
          setOpen(false);
          setStep("search");

          const currentCheckIn = checkIn;
          const currentCheckOut = checkOut;

          // Reset form
          setName("");
          setEmail("");
          setPhone("");
          setCheckIn("");
          setCheckOut("");

          navigate({
            to: "/checkout",
            search: {
              kind: "stay",
              title: rooms?.find((r) => r.key === selectedRoomKey)?.name || "Room Reservation",
              itemId: selectedRoomKey,
              description: `${guests} guest(s) · ${booking.nights} night(s)`,
              quantity: booking.nights,
              amount: booking.totalAmount,
              commission: Math.round(booking.totalAmount * 0.12),
              checkIn: currentCheckIn,
              checkOut: currentCheckOut,
              returnTo: "/availability",
            },
          });
        },
      },
    );
  }

  function handleClose() {
    setOpen(false);
    setStep("search");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Reserve Your Sanctuary</DialogTitle>
          <DialogDescription>
            Step {step === "search" ? 1 : step === "details" ? 2 : 3} of 3
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Step 1: Search */}
          {step === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="checkin">Check In</Label>
                <Input
                  id="checkin"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="checkout">Check Out</Label>
                <Input
                  id="checkout"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="guests">Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="4"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSearch} className="flex-1">
                  Search Rooms
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Room */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                {rooms?.map((room) => {
                  const avail = availability?.find((a) => a.roomKey === room.key);
                  const available = avail?.available || 0;
                  const fits = avail?.fits ?? false;
                  const isAvailable = available > 0 && fits;

                  return (
                    <motion.div
                      key={room.key}
                      whileHover={isAvailable ? { scale: 1.02 } : {}}
                      onClick={() => isAvailable && setSelectedRoomKey(room.key)}
                      className={`p-3 border rounded cursor-pointer transition ${
                        isAvailable
                          ? selectedRoomKey === room.key
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary"
                          : "opacity-50 cursor-not-allowed border-muted"
                      }`}
                    >
                      <div className="font-semibold">{room.name}</div>
                      <div className="text-sm text-muted-foreground">{room.description}</div>
                      <div className="text-sm mt-2">
                        ₹{room.rate}/night{" "}
                        {isAvailable ? `• ${available} available` : "• Fully booked"}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("search")} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSelectRoom} className="flex-1">
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Guest Details */}
          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-muted p-3 rounded text-sm">
                <div>
                  <strong>{rooms?.find((r) => r.key === selectedRoomKey)?.name}</strong>
                </div>
                <div className="text-muted-foreground">
                  {checkIn} to {checkOut} • {guests} guest(s)
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91..."
                />
              </div>

              {error && <div className="text-red-600 text-sm">{error.message}</div>}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("details")}
                  className="flex-1"
                  disabled={isPending}
                >
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1" disabled={isPending}>
                  {isPending ? "Creating..." : "Confirm Booking"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
