import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewsSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Tendai",
      rating: 5,
      comment: "Working with Misheck Serima was an outstanding experience. His attention to detail and technical expertise in developing our company's web application was exceptional. He delivered exactly what we needed and more!",
      date: "2025-03-15"
    },
    {
      id: 2,
      name: "Lisah",
      rating: 5,
      comment: "Misheck is a talented developer who brings both technical skills and creative solutions to the table. He helped us create a beautiful and functional website that perfectly represents our brand. Highly recommended!",
      date: "2025-02-20"
    },
    {
      id: 3,
      name: "Charles",
      rating: 5,
      comment: "I had the pleasure of working with Misheck on our AI-powered inventory system. His understanding of both frontend and backend technologies made the development process smooth and efficient. A true professional!",
      date: "2025-01-10"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() === '' || rating === 0 || comment.trim() === '') {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields and provide a rating",
        variant: "destructive"
      });
      return;
    }
    
    const newReview = {
      id: reviews.length + 1,
      name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([newReview, ...reviews]);
    setName('');
    setRating(0);
    setComment('');
    
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <section className="py-12 animate-fade-in">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Client Reviews</h2>
          <p className="text-muted-foreground">
            Feedback from people I've worked with
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-6 w-6 ${
                    star <= Math.round(Number(calculateAverageRating())) 
                      ? "text-primary fill-primary" 
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold">{calculateAverageRating()}</span>
            <span className="text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Reviews List */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Recent Reviews</h3>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4 animate-slide-up">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{review.name}</h4>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-primary fill-primary" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No reviews yet.</p>
            )}
          </div>
          
          {/* Submit Review Form */}
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "text-primary fill-primary"
                            : "text-muted"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-1">
                  Your Review
                </label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience working with me"
                  rows={4}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Submit Review
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
