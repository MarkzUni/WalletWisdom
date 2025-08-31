"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, TrendingUp, Users, DollarSign } from "lucide-react"

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

export default function StocksETFsCommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "IndexInvestor",
      avatar: "/placeholder.svg?height=40&width=40&text=II",
      title: "My 3-Fund Portfolio: 10 Years Later",
      content:
        "Started with the classic Bogleheads 3-fund portfolio in 2014. Here are my results:\n\n**Original Allocation:**\n- 70% VTSAX (Total Stock Market)\n- 20% VTIAX (International)\n- 10% VBTLX (Bonds)\n\n**10-Year Performance:**\n- Initial Investment: $50,000\n- Additional Contributions: $2,000/month\n- Current Value: $487,000\n- Average Annual Return: 9.2%\n\n**Key Lessons:**\n- Stayed the course through 2020 crash\n- Rebalanced annually\n- Never tried to time the market\n- Increased bond allocation to 20% as I got older\n\nSimple beats complex every time. The hardest part was doing nothing!",
      likes: 289,
      comments: 52,
      timeAgo: "4 hours ago",
      tags: ["Index Funds", "Long-term", "Bogleheads", "Portfolio"],
      isLiked: false,
      showComments: false,
      commentsList: [],
    },
    {
      id: "2",
      author: "DividendDan",
      avatar: "/placeholder.svg?height=40&width=40&text=DD",
      title: "Building a $100K Dividend Portfolio: My Holdings",
      content:
        "Reached $100K in my dividend growth portfolio! Here's my current allocation:\n\n**Top Holdings:**\n- JNJ (5.2%) - Dividend King, healthcare stability\n- MSFT (4.8%) - Tech growth + increasing dividends\n- KO (4.1%) - Consumer staple, reliable income\n- ABBV (3.9%) - High yield, strong pipeline\n- VYM (15%) - Diversified dividend ETF\n\n**Portfolio Stats:**\n- Average Yield: 3.4%\n- Annual Dividend Income: $3,400\n- 5-Year Dividend Growth Rate: 8.2%\n\n**Strategy:**\n- Focus on dividend growth, not just yield\n- Reinvest all dividends automatically\n- Add $1,500 monthly to highest conviction names\n\nGoal is $5K annual income by 2026!",
      likes: 234,
      comments: 41,
      timeAgo: "6 hours ago",
      tags: ["Dividends", "Income Investing", "Blue Chip", "DRIP"],
      isLiked: true,
      showComments: false,
      commentsList: [],
    },
    {
      id: "3",
      author: "TechStockTina",
      avatar: "/placeholder.svg?height=40&width=40&text=TST",
      title: "Why I'm Rotating Out of Growth Stocks",
      content:
        "After 5 years of heavy tech allocation, I'm rebalancing. Here's why:\n\n**My Growth Portfolio (2019-2024):**\n- NVDA: +1,247% (sold 50% position)\n- TSLA: +423% (sold 75% position)\n- AMZN: +67% (holding)\n- GOOGL: +89% (holding)\n- META: +156% (reduced position)\n\n**Why I'm Taking Profits:**\n- Valuations are stretched (40+ P/E ratios)\n- Interest rates affecting growth premiums\n- Concentration risk was too high (70% of portfolio)\n- Want to diversify into value and international\n\n**New Allocation Target:**\n- 40% Growth (down from 70%)\n- 30% Value stocks and ETFs\n- 20% International developed\n- 10% REITs and commodities\n\nProfit-taking is hard, but risk management is crucial!",
      likes: 178,
      comments: 67,
      timeAgo: "8 hours ago",
      tags: ["Growth Stocks", "Rebalancing", "Risk Management", "Tech"],
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
      <section className="py-12 px-4 bg-deep-teal text-soft-beige">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-soft-beige rounded-xl">
                <TrendingUp className="h-8 w-8 text-deep-teal" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Stocks & ETFs Community</h1>
                <p className="text-lg opacity-90 mt-2">Discuss stock picks, ETF strategies, and market analysis</p>
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {isJoined ? "24.7k members" : "24.6k members"}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    4.1k posts this month
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
                    ? "border-soft-beige text-soft-beige hover:bg-soft-beige hover:text-deep-teal"
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
                          placeholder="Share your stock or ETF strategy..."
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Tell the community about your picks, analysis, or questions..."
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
                        className="bg-mist-blue/20 text-deep-teal hover:bg-mist-blue/30"
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
