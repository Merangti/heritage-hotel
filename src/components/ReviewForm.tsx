import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useCreateReview } from "@/hooks/use-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [stars, setStars] = useState(5);
  const [body, setBody] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const { mutate: createReview, isPending, error } = useCreateReview();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !origin || !body) {
      alert("Please fill in all fields");
      return;
    }

    createReview(
      { name, origin, stars, body },
      {
        onSuccess: () => {
          // Reset form
          setName("");
          setOrigin("");
          setStars(5);
          setBody("");
          alert("Thank you for your entry in the guest journal!");
        },
      },
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 rounded-lg border border-border bg-vellum/30 p-8 backdrop-blur"
    >
      <div>
        <h3 className="text-2xl font-semibold">Write Your Entry</h3>
        <p className="text-sm text-muted-foreground">Share your story from The Heritage Hearth</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="review-name">Your Name</Label>
          <Input
            id="review-name"
            placeholder="Full name or initials"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="review-origin">City / Region</Label>
          <Input
            id="review-origin"
            placeholder="Where are you from?"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            disabled={isPending}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Rating</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.button
              key={i}
              type="button"
              whileHover={{ scale: 1.2 }}
              onClick={() => setStars(i)}
              onMouseEnter={() => setHoveredStar(i)}
              onMouseLeave={() => setHoveredStar(0)}
              className="focus:outline-none"
            >
              <Star
                size={24}
                className={`transition ${
                  i <= (hoveredStar || stars)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground"
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="review-body">Your Entry</Label>
        <Textarea
          id="review-body"
          placeholder="Tell us about your stay, the meals, the views, the silence, the stories... What moved you?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isPending}
          className="min-h-32 resize-none"
        />
      </div>

      {error && <div className="rounded bg-red-50 p-3 text-red-600 text-sm">{error.message}</div>}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Submitting..." : "Submit Entry"}
      </Button>
    </motion.form>
  );
}
