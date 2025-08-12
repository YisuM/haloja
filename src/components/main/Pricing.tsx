import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Zap, Shield, Globe, Headphones } from "lucide-react"
import Link from "next/link"
import Footer from "./Footer"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for personal projects and small websites",
      features: [
        "1 WordPress site",
        "10GB SSD storage",
        "100GB bandwidth",
        "Free SSL certificate",
        "Daily backups",
        "Email support",
      ],
      notIncluded: ["Priority support", "Advanced security", "CDN included"],
      popular: false,
      cta: "Start Free Trial",
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for growing businesses and agencies",
      features: [
        "5 WordPress sites",
        "50GB SSD storage",
        "500GB bandwidth",
        "Free SSL certificate",
        "Daily backups",
        "Priority support",
        "Advanced security",
        "CDN included",
        "Staging environments",
      ],
      notIncluded: ["White-label options"],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations with complex needs",
      features: [
        "Unlimited WordPress sites",
        "200GB SSD storage",
        "Unlimited bandwidth",
        "Free SSL certificate",
        "Real-time backups",
        "24/7 phone support",
        "Enterprise security",
        "Global CDN",
        "Staging environments",
        "White-label options",
        "Custom integrations",
        "Dedicated account manager",
      ],
      notIncluded: [],
      popular: false,
      cta: "Contact Sales",
    },
  ]

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Optimized servers with SSD storage for maximum performance",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Advanced security measures to protect your websites",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global CDN",
      description: "Worldwide content delivery for faster loading times",
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Expert support team available around the clock",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-950">

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-serif text-slate-900 dark:text-white mb-6">
            Simple, Transparent
            <span className="text-emerald-600 dark:text-emerald-400"> Pricing</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your WordPress hosting needs. All plans include our core features with no hidden
            fees.
          </p>
          <div className="flex justify-center items-center space-x-4 mb-12">
            <span className="text-slate-600 dark:text-slate-400">Monthly</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-12 h-6 bg-slate-300 dark:bg-slate-600 rounded-full shadow-inner"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"></div>
            </div>
            <span className="text-slate-600 dark:text-slate-400">
              Yearly
              <Badge className="ml-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "ring-2 ring-emerald-500 shadow-xl scale-105" : "shadow-lg"} bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                    <span className="text-slate-600 dark:text-slate-400">{plan.period}</span>
                  </div>
                  <CardDescription className="text-slate-600 dark:text-slate-400 mt-4">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3 opacity-50">
                      <X className="h-5 w-5 text-slate-400 flex-shrink-0" />
                      <span className="text-slate-500 dark:text-slate-400">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-slate-900 dark:text-white mb-4">Everything You Need</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              All plans include our essential features to keep your WordPress sites running smoothly and securely.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Can I upgrade or downgrade my plan anytime?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take
                effect at the next billing cycle.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Do you offer a money-back guarantee?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                We offer a 30-day money-back guarantee on all plans. If you're not satisfied, we'll refund your payment
                in full.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                What happens if I exceed my bandwidth limit?
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                We'll notify you before you reach your limit. You can upgrade your plan or purchase additional bandwidth
                as needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-700 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-serif text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of satisfied customers who trust CMS Cloud with their WordPress hosting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-3">
              Start Your Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3 bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
