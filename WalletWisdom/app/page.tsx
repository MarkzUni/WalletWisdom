"use client"

import Link from "next/link"
import { ArrowRight, Bitcoin, Building2, DollarSign, PiggyBank, TrendingUp, Users } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([])

  const handleJoinCommunity = (communityTitle: string) => {
    if (joinedCommunities.includes(communityTitle)) {
      setJoinedCommunities(joinedCommunities.filter((c) => c !== communityTitle))
    } else {
      setJoinedCommunities([...joinedCommunities, communityTitle])
    }
  }

  const communities = [
    {
      title: "Crypto",
      description: "Explore cryptocurrency strategies, DeFi opportunities, and digital asset management",
      icon: Bitcoin,
      members: "12.5k",
      color: "bg-warm-gold",
      href: "/communities/crypto",
    },
    {
      title: "Savings",
      description: "Share high-yield savings strategies, emergency funds, and budgeting techniques",
      icon: PiggyBank,
      members: "18.2k",
      color: "bg-forest-green",
      href: "/communities/savings",
    },
    {
      title: "Stocks & ETFs",
      description: "Discuss stock picks, ETF strategies, and long-term investment approaches",
      icon: TrendingUp,
      members: "24.7k",
      color: "bg-deep-teal",
      href: "/communities/stocks-etfs",
    },
    {
      title: "Physical Assets",
      description: "Learn about precious metals, commodities, and tangible investment strategies",
      icon: DollarSign,
      members: "8.9k",
      color: "bg-warm-gold",
      href: "/communities/physical-assets",
    },
    {
      title: "Real Estate",
      description: "Share property investment strategies, REITs, and real estate market insights",
      icon: Building2,
      members: "15.3k",
      color: "bg-forest-green",
      href: "/communities/real-estate",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-mist-blue/20 bg-soft-beige">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-deep-teal rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-soft-beige" />
              </div>
              <span className="text-2xl font-bold">WalletWisdom</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/communities" className="text-muted-foreground hover:text-foreground">
                Communities
              </Link>
              <Link href="/discussions" className="text-muted-foreground hover:text-foreground">
                Discussions
              </Link>
              <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                Resources
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button>Join Community</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Share Your Financial <span className="text-deep-teal">Wisdom</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join thousands of investors and savers sharing their strategies, experiences, and insights. Learn from real
            people making real financial decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 bg-warm-gold hover:bg-warm-gold/90 text-deep-teal font-semibold">
              Explore Communities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-soft-beige"
            >
              Share Your Story
            </Button>
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="py-16 px-4 bg-mist-blue/10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Strategy Communities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with like-minded individuals and discover proven strategies across different investment categories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {communities.map((community, index) => {
              const IconComponent = community.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-3 rounded-lg ${community.color}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {community.members}
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-deep-teal transition-colors">{community.title}</CardTitle>
                    <CardDescription className="text-sm">{community.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleJoinCommunity(community.title)}
                      className={`w-full justify-between font-medium transition-colors ${
                        joinedCommunities.includes(community.title)
                          ? "bg-deep-teal text-soft-beige hover:bg-deep-teal/90"
                          : "group-hover:bg-warm-gold group-hover:text-deep-teal"
                      }`}
                      variant={joinedCommunities.includes(community.title) ? "default" : "ghost"}
                    >
                      {joinedCommunities.includes(community.title) ? "✓ Joined" : "Join Community"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-deep-teal mb-2">50k+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-deep-teal mb-2">125k+</div>
              <div className="text-muted-foreground">Strategies Shared</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-deep-teal mb-2">$2.5B+</div>
              <div className="text-muted-foreground">Assets Discussed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-deep-teal text-soft-beige">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Share Your Financial Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community today and start learning from thousands of real investors and savers
          </p>
          <Button size="lg" className="text-lg px-8 bg-warm-gold hover:bg-warm-gold/90 text-deep-teal font-semibold">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 bg-deep-teal rounded flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-soft-beige" />
                </div>
                <span className="text-lg font-bold">WalletWisdom</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering financial decisions through community wisdom and shared experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Communities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/communities/crypto">Crypto</Link>
                </li>
                <li>
                  <Link href="/communities/savings">Savings</Link>
                </li>
                <li>
                  <Link href="/communities/stocks-etfs">Stocks & ETFs</Link>
                </li>
                <li>
                  <Link href="/communities/real-estate">Real Estate</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/guides">Investment Guides</Link>
                </li>
                <li>
                  <Link href="/tools">Financial Tools</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/newsletter">Newsletter</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 WalletWisdom. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
