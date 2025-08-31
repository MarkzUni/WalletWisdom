"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  PiggyBank,
  TrendingUp,
  Clock,
  Users,
  DollarSign,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export default function SavingsCommunityPage() {
  const [activeFilter, setActiveFilter] = useState<"trending" | "new">("trending")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      title: "How I Built a $50K Emergency Fund in 18 Months",
      content:
        "Started with $0 in savings at 25. Here's my exact strategy that helped me save $50K:\n\n1. **Automated everything** - Set up automatic transfers of $500/week\n2. **High-yield savings** - Moved to Marcus by Goldman Sachs (4.5% APY)\n3. **Side hustle income** - Freelance graphic design added $800/month\n4. **Expense tracking** - Used YNAB religiously\n\nThe key was treating savings like a non-negotiable bill. Would love to hear your strategies!",
      likes: 234,
      comments: 45,
      timeAgo: "2 hours ago",
      tags: ["Emergency Fund", "High-Yield Savings", "Budgeting"],
      isLiked: false,
      showComments: false,
      commentsList: [
        {
          id: "c1",
          author: "Mike Rodriguez",
          avatar: "/placeholder.svg?height=32&width=32&text=MR",
          content:
            "Amazing progress @SarahChen! I'm using a similar strategy but only at $15K so far. What percentage of income were you saving?",
          likes: 12,
          timeAgo: "1 hour ago",
          isLiked: false,
        },
        {
          id: "c2",
          author: "Emma Thompson",
          avatar: "/placeholder.svg?height=32&width=32&text=ET",
          content:
            "The automation tip is gold! I set up my transfers to happen right after payday so I never see the money.",
          likes: 8,
          timeAgo: "45 minutes ago",
          isLiked: true,
        },
      ],
    },
    {
      id: "2",
      author: "David Park",
      avatar: "/placeholder.svg?height=40&width=40&text=DP",
      title: "CD Laddering Strategy: Earning 5.2% While Staying Liquid",
      content:
        "Been experimenting with CD laddering and wanted to share my setup:\n\n**My 12-month ladder:**\n- $10K in 3-month CDs (5.0% APY)\n- $10K in 6-month CDs (5.1% APY) \n- $10K in 9-month CDs (5.15% APY)\n- $10K in 12-month CDs (5.2% APY)\n\nEvery 3 months, I reinvest the maturing CD into a new 12-month term. This gives me liquidity every quarter while maximizing rates.\n\nCurrently averaging 5.2% across the portfolio. Anyone else doing CD ladders?",
      likes: 189,
      comments: 32,
      timeAgo: "4 hours ago",
      tags: ["CDs", "Interest Rates", "Liquidity"],
      isLiked: true,
      showComments: false,
      commentsList: [
        {
          id: "c3",
          author: "Lisa Wang",
          avatar: "/placeholder.svg?height=32&width=32&text=LW",
          content: "This is brilliant! Which banks are you using for the best CD rates? @DavidPark",
          likes: 15,
          timeAgo: "3 hours ago",
          isLiked: false,
        },
      ],
    },
    {
      id: "3",
      author: "Jennifer Martinez",
      avatar: "/placeholder.svg?height=40&width=40&text=JM",
      title: 'Mistake Alert: Why I\'m Leaving My "High-Yield" Savings Account',
      content:
        'PSA for anyone still with traditional banks! 🚨\n\nI just realized my "high-yield" savings at Chase was only giving me 0.01% APY while I could be getting 4.5%+ elsewhere.\n\n**The math is shocking:**\n- $25K at Chase (0.01%): $2.50/year\n- $25K at Marcus (4.5%): $1,125/year\n- **Difference: $1,122.50 lost annually!**\n\nMaking the switch this week. Don\'t be like me - check your rates regularly!\n\nBest current rates I found:\n- Marcus by Goldman Sachs: 4.5%\n- Ally Bank: 4.25%\n- Capital One 360: 4.3%',
      likes: 156,
      comments: 28,
      timeAgo: "6 hours ago",
      tags: ["High-Yield Savings", "Bank Comparison", "Interest Rates"],
      isLiked: false,
      showComments: false,
      commentsList: [],
    },
    {
      id: "4",
      author: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
      title: "The 1% Rule: How Small Changes Led to Big Savings",
      content:
        "Inspired by atomic habits, I applied the 1% rule to my savings:\n\n**Month 1:** Save 1% of income ($45)\n**Month 2:** Increase by 1% ($90)\n**Month 3:** Another 1% ($135)\n\nBy month 12, I was saving 12% of my income without feeling the pinch!\n\n**Total saved in year 1:** $29,250\n\nThe gradual increase made it feel effortless. Now I'm at 20% savings rate and it feels normal.\n\nAnyone else tried gradual increases like this?",
      likes: 203,
      comments: 41,
      timeAgo: "8 hours ago",
      tags: ["Savings Rate", "Habits", "Budgeting"],
      isLiked: true,
      showComments: false,
      commentsList: [],
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [isJoined, setIsJoined] = useState(true)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [sortBy, setSortBy] = useState<"trending" | "new" | "top" | "discussed">("trending")
  const [timeFilter, setTimeFilter] = useState<"all" | "today" | "week" | "month">("all")
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

  const toggleCommentLike = (postId: string, commentId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentsList: post.commentsList.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      isLiked: !comment.isLiked,
                      likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                    }
                  : comment,
              ),
            }
          : post,
      ),
    )
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

    // Apply time filter
    if (timeFilter !== "all") {
      const now = new Date()
      const timeThresholds = {
        today: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
      }
      // For demo purposes, we'll show all posts but in real app would filter by actual time
    }

    // Apply sorting
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
                <PiggyBank className="h-8 w-8 text-forest-green" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Savings Community</h1>
                <p className="text-lg opacity-90 mt-2">Share strategies, tips, and celebrate your savings wins</p>
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {isJoined ? "18.2k members" : "18.1k members"}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    2.1k posts this month
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
                          placeholder="Share your savings strategy..."
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Tell the community about your experience, tips, or questions..."
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
                <TabsTrigger value="trending" className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="new" className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  New
                </TabsTrigger>
                <TabsTrigger value="top" className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Top
                </TabsTrigger>
                <TabsTrigger value="discussed" className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Most Discussed
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center space-x-4">
              <Select value={timeFilter} onValueChange={(value) => setTimeFilter(value as any)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-muted-foreground">{getFilteredAndSortedPosts().length} posts</div>
            </div>
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

                  {/* Tags */}
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

                  {/* Actions */}
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

                  {/* Comments Section */}
                  {post.showComments && (
                    <div className="mt-6 pt-6 border-t">
                      {/* Add Comment */}
                      <div className="flex space-x-3 mb-6">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Add a comment... Use @ to tag someone"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[80px] resize-none"
                          />
                          <div className="flex justify-end mt-2">
                            <Button size="sm" className="bg-warm-gold hover:bg-warm-gold/90 text-deep-teal">
                              Comment
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-4">
                        {post.commentsList.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {comment.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-mist-blue/10 rounded-lg p-3">
                                <div className="font-semibold text-sm mb-1">{comment.author}</div>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                                <span>{comment.timeAgo}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleCommentLike(post.id, comment.id)}
                                  className={`h-auto p-0 ${comment.isLiked ? "text-red-500" : ""}`}
                                >
                                  <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                                  {comment.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground">
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
