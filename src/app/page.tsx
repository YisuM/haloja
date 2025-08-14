import Footer from "@/components/main/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Server, Shield, Users, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Hero Section */}
      <section className="bg-white dark:bg-card py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-foreground mb-6 font-serif">
            Reliable Hosting for Your <span className="text-emerald-600 dark:text-primary">CMS Needs</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience seamless performance and unmatched support for WordPress, Drupal, and other CMS platforms. Built
            for developers, loved by businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg bg-transparent dark:text-primary dark:border-primary"
            >
              View Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-muted-foreground mt-4">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-foreground mb-4 font-serif">Why Choose Haloja Cloud?</h2>
            <p className="text-xl text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
              Everything you need to host and manage your CMS platforms with confidence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-card border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-emerald-100 dark:bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-emerald-600 dark:text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4 font-serif">99.9% Uptime Guarantee</h3>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  Rock-solid infrastructure with enterprise-grade security and monitoring to keep your sites running
                  24/7.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-card border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-emerald-100 dark:bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-emerald-600 dark:text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4 font-serif">Lightning Fast Performance</h3>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  Optimized servers and CDN integration ensure your WordPress and CMS sites load in milliseconds.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-card border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-emerald-100 dark:bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-emerald-600 dark:text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4 font-serif">24/7 Expert Support</h3>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  Our CMS specialists are always ready to help with migrations, optimizations, and troubleshooting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-foreground mb-4 font-serif">What Our Users Say</h2>
            <p className="text-xl text-gray-600 dark:text-muted-foreground">Trusted by thousands of businesses worldwide</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-50 dark:bg-background border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="h-5 w-5 text-emerald-500 dark:text-primary mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-foreground mb-6 leading-relaxed">
                  Migration was seamless and our site performance improved dramatically. The support team is incredibly
                  knowledgeable.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-muted rounded-full flex items-center justify-center mr-4">
                    <span className="text-emerald-600 dark:text-primary font-bold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-foreground">Sarah Johnson</p>
                    <p className="text-gray-600 dark:text-muted-foreground text-sm">Marketing Director</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 dark:bg-background border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="h-5 w-5 text-emerald-500 dark:text-primary mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-foreground mb-6 leading-relaxed">
                  Finally found a hosting provider that understands WordPress. Zero downtime in 8 months of hosting
                  with them.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-muted rounded-full flex items-center justify-center mr-4">
                    <span className="text-emerald-600 dark:text-primary font-bold">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-foreground">Mike Chen</p>
                    <p className="text-gray-600 dark:text-muted-foreground text-sm">Web Developer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 dark:bg-background border-0 md:col-span-2 lg:col-span-1">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="h-5 w-5 text-emerald-500 dark:text-primary mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-foreground mb-6 leading-relaxed">
                  The dashboard is intuitive and the automated backups give us peace of mind. Highly recommend for any
                  CMS project.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-muted rounded-full flex items-center justify-center mr-4">
                    <span className="text-emerald-600 dark:text-primary font-bold">AR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-foreground">Anna Rodriguez</p>
                    <p className="text-gray-600 dark:text-muted-foreground text-sm">Agency Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 dark:bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white dark:text-primary-foreground mb-6 font-serif">Ready to Experience Better Hosting?</h2>
          <p className="text-xl text-emerald-100 dark:text-secondary mb-8 leading-relaxed">
            Join thousands of satisfied customers who trust Haloja Cloud with their most important websites.
          </p>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold dark:bg-card dark:text-primary">
            Start Your Free Trial
          </Button>
          <p className="text-emerald-100 dark:text-secondary text-sm mt-4">14 days free • No setup fees • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}