import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Coffee, UtensilsCrossed, Gem } from "lucide-react";

const DonationSection = () => {
  // Using Ko-fi links - user can create a free Ko-fi account and update these URLs
  const kofiUsername = "chrisdias"; // Replace with actual Ko-fi username
  
  const donationOptions = [
    {
      icon: Coffee,
      title: "Buy me a coffee",
      amount: "£5",
      description: "A small thank you",
      url: `https://ko-fi.com/${kofiUsername}?amount=5`,
      color: "bg-amber-50 border-amber-200 hover:border-amber-300",
      iconColor: "text-amber-600",
    },
    {
      icon: UtensilsCrossed,
      title: "Buy me lunch",
      amount: "£20",
      description: "Much appreciated",
      url: `https://ko-fi.com/${kofiUsername}?amount=20`,
      color: "bg-emerald-50 border-emerald-200 hover:border-emerald-300",
      iconColor: "text-emerald-600",
    },
    {
      icon: Gem,
      title: "I'm feeling generous",
      amount: "£250",
      description: "Acknowledge the hundreds of hours of work",
      url: `https://ko-fi.com/${kofiUsername}?amount=250`,
      color: "bg-violet-50 border-violet-200 hover:border-violet-300",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <section 
      id="support" 
      className="w-full max-w-4xl mx-auto px-4 py-12"
      aria-labelledby="support-heading"
    >
      <Card className="bg-gradient-to-br from-rose-50/80 to-amber-50/80 border-rose-100">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-rose-500" aria-hidden="true" />
              <h2 id="support-heading" className="text-2xl font-bold text-foreground">
                Support This Tool
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The founder wishes to keep this assessment tool completely free for all entrepreneurs, 
              for ethical reasons. If you found it useful and would like to support its continued 
              development and maintenance, you can make a voluntary contribution.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            {donationOptions.map((option) => (
              <a
                key={option.title}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${option.color}`}
                aria-label={`${option.title} - ${option.amount}`}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <option.icon className={`h-8 w-8 ${option.iconColor}`} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-foreground">{option.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{option.amount}</p>
                    <p className="text-xs text-muted-foreground mt-2">{option.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            All contributions go directly to supporting the development of free immigration tools.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default DonationSection;
