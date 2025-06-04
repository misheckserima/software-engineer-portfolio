
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MapPin, Phone, Send, MessageSquare, User } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "serimaahsur@gmail.com",
      link: "mailto:serimaahsur@mail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+263 77 338 5732",
      link: "tel:+263773385732",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Zimbabwe, Harare",
      link: "https://maps.google.com/?q=Harare,Zimbabwe",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: "Inquire About Services",
      link: "https://wa.me/263773385732?text=Hi%20there!%20I%20noticed%20your%20professional%20photography%20services%20and%20am%20interested%20in%20discussing%20how%20we%20can%20work%20together.%20Could%20you%20please%20share%20more%20details%20about%20your%20services%20and%20pricing?%20Thank%20you!",
    },
    {
      icon: User,
      label: "LinkedIn",
      value: "Service Inquiry",
      link: "https://www.linkedin.com/in/misheckserima?message=true&body=Hi%20there!%20I%20noticed%20your%20professional%20photography%20services%20and%20am%20interested%20in%20discussing%20how%20we%20can%20work%20together.%20Could%20you%20please%20share%20more%20details%20about%20your%20services%20and%20pricing?%20Thank%20you!%20%0A%0A%23photography%20%23services%20%23inquiry",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 gradient-text inline-block">Contact Me</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-6">
                  Have a project in mind or want to discuss potential opportunities? Send me a message!
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-hero-pattern text-white">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
                <p className="mb-6">
                  I'm always interested in hearing about new projects and opportunities. Feel free to reach out through any of these channels.
                </p>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <Card key={index} className="overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-4">
                    <a href={item.link} className="flex items-center gap-4" target="_blank" rel="noreferrer">
                      <div className="p-3 rounded-full bg-primary/20">
                        <item.icon className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Availability</h2>
                <p className="text-muted-foreground">
                  I'm currently available for freelance work and open to discussing full-time opportunities. My typical response time is within 24-48 hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
