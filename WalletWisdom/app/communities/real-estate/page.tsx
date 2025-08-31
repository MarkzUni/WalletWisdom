"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, Building2, Users, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  likes: number
  timeAgo: string
  isLiked: boolean
}

interface Post {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  likes: number
  comments: number
  timeAgo: string
  tags: string[]
  isLiked: boolean
  commentsList: Comment[]
  showComments: boolean
}

export default function RealEstateCommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "PropertyPro",
      avatar: "/placeholder.svg?height=40&width=40&text=PP",
      title: "My 10-Property Rental Portfolio: 5-Year Journey",
      content:
        "Started with one duplex in 2019, now own 10 rental properties. Here's the breakdown:\n\n**Portfolio Overview:**\n- 6 Single-family homes (average $180K each)\n- 3 Duplexes (average $240K each)\n- 1 Small apartment building (8 units, $650K)\n\n**Financing Strategy:**\n- Started with 20% down conventional loans\n- Used BRRRR method on 4 properties\n- Portfolio loans for properties 5-10\n- Average interest rate: 4.2%\n\n**Cash Flow:**\n- Monthly rental income: $14,200\n- Monthly expenses: $8,900\n- Net cash flow: $5,300/month\n- Total invested: $420K\n- Current portfolio value: $1.8M\n\n**Key Lessons:**\n- Location matters more than condition\n- Good property management is worth the cost\n- Always budget for vacancies and repairs\n- Leverage is powerful but risky\n\nHappy to answer questions about scaling!",
      likes: 312,
      comments: 78,
      timeAgo: "4 hours ago",
      tags: ["Rental Properties", "BRRRR", "Cash Flow", "Portfolio"],
      isLiked: false,
      showComments: false,
      commentsList: [],
    },
    {
      id: "2",
      author: "REITQueen",
      avatar: "/placeholder.svg?height=40&width=40&text=RQ",
      title: "REITs vs Direct Real Estate: My 50/50 Strategy",
      content:
        "After 8 years investing in both REITs and direct real estate, here's my approach:\n\n**REIT Portfolio (50% of RE allocation):**\n- VNQ (Vanguard REIT ETF): 30%\n- SCHH (Schwab US REIT ETF): 20%\n- Individual REITs: 50%\n  - Realty Income (O): 15%\n  - Digital Realty Trust (DLR): 10%\n  - Prologis (PLD): 10%\n  - American Tower (AMT): 10%\n  - Public Storage (PSA): 5%\n\n**Direct Real Estate (50%):**\n- Primary residence (paid off)\n- 2 rental properties in growing suburbs\n- 1 vacation rental (Airbnb)\n\n**Why 50/50 Split:**\n- REITs: Liquidity, diversification, professional management\n- Direct: Control, tax benefits, leverage potential\n- REITs: Lower barrier to entry, no tenant headaches\n- Direct: Higher potential returns, inflation hedge\n\n**Performance (5 years):**\n- REITs: 8.2% annual return + 4.1% dividend yield\n- Direct: 12.7% annual return (including appreciation)\n\nBoth have their place in a balanced portfolio!",
      likes: 198,
      comments: 45,
      timeAgo: "6 hours ago",
      tags: ["REITs", "Direct Real Estate", "Diversification", "Dividends"],
      isLiked: true,
      showComments: false,
      commentsList: [],
    },
    {
      id: "3",
      author: "FlipMaster",
      avatar: "/placeholder.svg?height=40&width=40&text=FM",
      title: "House Flipping Reality Check: My Wins and Losses",
      content:
        "3 years of flipping houses - here's the honest breakdown:\n\n**Completed Flips (12 total):**\n\n**Best Flip:**\n- Purchase: $85K (foreclosure)\n- Renovation: $35K (kitchen, bathrooms, flooring)\n- Sale: $165K\n- Profit: $35K (after all costs)\n- Timeline: 4 months\n\n**Worst Flip:**\n- Purchase: $120K\n- Renovation: $55K (foundation issues discovered)\n- Sale: $155K\n- Loss: $15K (after holding costs)\n- Timeline: 8 months (permit delays)\n\n**Overall Results:**\n- Total invested: $1.2M\n- Total profit: $180K\n- Average profit per flip: $15K\n- Time investment: 60+ hours per week\n\n**Hard Truths:**\n- Unexpected issues always arise\n- Permits and inspections cause delays\n- Market timing affects profits significantly\n- It's a full-time job, not passive income\n- Need significant cash reserves\n\n**Moving Forward:**\n- Transitioning to buy-and-hold rentals\n- Less stress, more predictable returns\n- Flipping taught me renovation skills\n\nNot as glamorous as TV shows make it seem!",
      likes: 234,
      comments: 67,
      timeAgo: "8 hours ago",
      tags: ["House Flipping", "Renovation", "Real Estate", "Lessons Learned"],
      isLiked: false,
      showComments: false,
      commentsList: [],
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [isJoined, setIsJoined] = useState(true)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [sortBy, setSortBy] = useState<"trending" | "new" | "top" | "discussed">("trending")
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    tags: [] as string[],
    currentTag: "",
  })

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const toggleComments = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, showComments: !post.showComments } : post)))
  }

  const handleJoinCommunity = () => {
    setIsJoined(!isJoined)
  }

  const handleCreatePost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: "You",
        avatar: "/placeholder.svg?height=40&width=40&text=You",
        title: newPost.title,
        content: newPost.content,
        likes: 0,
        comments: 0,
        timeAgo: "Just now",
        tags: newPost.tags,
        isLiked: false,
        showComments: false,
        commentsList: [],
      }
      setPosts([post, ...posts])
      setNewPost({ title: "", content: "", tags: [], currentTag: "" })
      setShowCreatePost(false)
    }
  }

  const addTag = () => {
    if (newPost.currentTag.trim() && !newPost.tags.includes(newPost.currentTag.trim())) {
      setNewPost({
        ...newPost,
        tags: [...newPost.tags, newPost.currentTag.trim()],
        currentTag: "",
      })
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const getFilteredAndSortedPosts = () => {
    const filtered = [...posts]
    switch (sortBy) {
      case "trending":
        return filtered.sort((a, b) => b.likes - a.likes)
      case "new":
        return filtered.sort((a, b) => new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime())
      case "top":
        return filtered.sort((a, b) => b.likes + b.comments * 2 - (a.likes + a.comments * 2))
      case "discussed":
        return filtered.sort((a, b) => b.comments - a.comments)
      default:
        return filtered
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-mist-blue/20 bg-soft-beige">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Communities
              </Link>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-deep-teal rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-soft-beige" />
                </div>
                <span className="text-2xl font-bold">WalletWisdom</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button>Join Community</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Community Header */}
      <section className="py-12 px-4 bg-forest-green text-soft-beige">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-soft-beige rounded-xl">
                <Building2 className="h-8 w-8 text-forest-green" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Real Estate Community</h1>
                <p className="text-lg opacity-90 mt-2">Share property strategies, REITs, and real estate insights</p>
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {isJoined ? "15.3k members" : "15.2k members"}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    2.8k posts this month
                  </div>
                  {isJoined && <Badge className="bg-warm-gold text-deep-teal">✓ Joined</Badge>}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleJoinCommunity}
                variant={isJoined ? "outline" : "default"}
                className={
                  isJoined
                    ? "border-soft-beige text-soft-beige hover:bg-soft-beige hover:text-forest-green"
                    : "bg-warm-gold hover:bg-warm-gold/90 text-deep-teal font-semibold"
                }
              >
                {isJoined ? "Leave Community" : "Join Community"}
              </Button>
              {isJoined && (
                <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
                  <DialogTrigger asChild>
                    <Button className="bg-warm-gold hover:bg-warm-gold/90 text-deep-teal font-semibold">
                      Create Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Post</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Post Title</Label>
                        <Input
                          id="title"
                          placeholder="Share your real estate strategy..."
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Tell the community about your properties, deals, or questions..."
                          className="min-h-[200px]"
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Tags</Label>
                        <div className="flex space-x-2 mb-2">
                          <Input
                            placeholder="Add a tag..."
                            value={newPost.currentTag}
                            onChange={(e) => setNewPost({ ...newPost, currentTag: e.target.value })}
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                          />
                          <Button type="button" onClick={addTag} variant="outline">
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newPost.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => removeTag(tag)}
                            >
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={handleCreatePost}
                          className="bg-deep-teal hover:bg-deep-teal/90"
                          disabled={!newPost.title.trim() || !newPost.content.trim()}
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="py-6 px-4 border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as any)} className="w-full md:w-auto">
              <TabsList className="grid w-full md:w-auto grid-cols-4">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="top">Top</TabsTrigger>
                <TabsTrigger value="discussed">Most Discussed</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="text-sm text-muted-foreground">{getFilteredAndSortedPosts().length} posts</div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-6 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {getFilteredAndSortedPosts().map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{post.author}</div>
                        <div className="text-sm text-muted-foreground">{post.timeAgo}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <h3 className="text-xl font-bold mb-3 text-deep-teal">{post.title}</h3>
                  <div className="prose prose-sm max-w-none mb-4">
                    <p className="whitespace-pre-line text-foreground">{post.content}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-forest-green/20 text-deep-teal hover:bg-forest-green/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-6 pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(post.id)}
                      className={`${post.isLiked ? "text-red-500" : "text-muted-foreground"} hover:text-red-500`}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleComments(post.id)}
                      className="text-muted-foreground hover:text-deep-teal"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-deep-teal">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
