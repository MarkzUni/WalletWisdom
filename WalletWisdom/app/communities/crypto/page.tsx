"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, Bitcoin, Users, DollarSign } from "lucide-react"

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

export default function CryptoCommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "CryptoMike",
      avatar: "/placeholder.svg?height=40&width=40&text=CM",
      title: "DCA Strategy: $100K Portfolio in 3 Years",
      content:
        "Started DCA into Bitcoin and Ethereum in 2021. Here's my exact strategy:\n\n**Weekly Investment:** $500 split 60/40 BTC/ETH\n**Total Invested:** $78,000 over 36 months\n**Current Value:** $102,000 (31% gain)\n\n**Key lessons:**\n- Stayed consistent through bear markets\n- Never tried to time the market\n- Used Coinbase Pro for lower fees\n- Set up automatic purchases\n\nThe hardest part was buying during the 2022 crash, but that's when I made the most gains. Patience pays off in crypto!",
      likes: 342,
      comments: 67,
      timeAgo: "3 hours ago",
      tags: ["DCA", "Bitcoin", "Ethereum", "Long-term"],
      isLiked: false,
      showComments: false,
      commentsList: [
        {
          id: "c1",
          author: "BlockchainBeth",
          avatar: "/placeholder.svg?height=32&width=32&text=BB",
          content: "Amazing discipline @CryptoMike! What made you stick to the plan during the 2022 crash?",
          likes: 23,
          timeAgo: "2 hours ago",
          isLiked: false,
        },
      ],
    },
    {
      id: "2",
      author: "DeFiDave",
      avatar: "/placeholder.svg?height=40&width=40&text=DD",
      title: "Yield Farming Reality Check: My 6-Month Results",
      content:
        "Been yield farming on various DeFi protocols. Here's the honest breakdown:\n\n**Platforms tried:**\n- Uniswap V3: 12% APY (but impermanent loss hurt)\n- Compound: 8% APY (stable, boring, reliable)\n- Curve: 15% APY (great for stablecoins)\n- PancakeSwap: 25% APY (high risk, high reward)\n\n**Reality check:**\n- Gas fees ate 15% of profits\n- Impermanent loss was real\n- Tax implications are complex\n- Time intensive to manage\n\n**Net result:** 18% annual return vs 23% just holding ETH\n\nSticking to simple strategies from now on.",
      likes: 198,
      comments: 45,
      timeAgo: "5 hours ago",
      tags: ["DeFi", "Yield Farming", "Uniswap", "Risk Management"],
      isLiked: true,
      showComments: false,
      commentsList: [],
    },
    {
      id: "3",
      author: "AltcoinAnna",
      avatar: "/placeholder.svg?height=40&width=40&text=AA",
      title: "Small Cap Gems: My Research Process",
      content:
        "How I research altcoins before investing (95% fail, but the 5% that succeed make it worth it):\n\n**Step 1: Fundamentals**\n- Real world problem being solved?\n- Strong development team?\n- Active GitHub commits?\n- Partnerships with real companies?\n\n**Step 2: Tokenomics**\n- Total supply and inflation rate\n- Token distribution (avoid heavy VC allocations)\n- Utility within the ecosystem\n\n**Step 3: Community**\n- Active Discord/Telegram\n- Organic growth vs paid shilling\n- Developer engagement\n\n**My rule:** Never more than 5% of portfolio in any single altcoin\n\nCurrent holds: MATIC, LINK, DOT, AVAX (all researched extensively)",
      likes: 156,
      comments: 38,
      timeAgo: "7 hours ago",
      tags: ["Altcoins", "Research", "Due Diligence", "Risk Management"],
      isLiked: false,
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
      <section className="py-12 px-4 text-deep-teal bg-purple-200">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-deep-teal rounded-xl">
                <Bitcoin className="h-8 w-8 text-warm-gold" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Crypto Community</h1>
                <p className="text-lg opacity-90 mt-2">Discuss Bitcoin, altcoins, DeFi, and blockchain strategies</p>
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {isJoined ? "12.5k members" : "12.4k members"}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    3.2k posts this month
                  </div>
                  {isJoined && <Badge className="bg-deep-teal text-warm-gold">✓ Joined</Badge>}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleJoinCommunity}
                variant={isJoined ? "outline" : "default"}
                className={
                  isJoined
                    ? "border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-warm-gold"
                    : "bg-deep-teal hover:bg-deep-teal/90 text-warm-gold font-semibold"
                }
              >
                {isJoined ? "Leave Community" : "Join Community"}
              </Button>
              {isJoined && (
                <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
                  <DialogTrigger asChild>
                    <Button className="bg-deep-teal hover:bg-deep-teal/90 text-warm-gold font-semibold">
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
                          placeholder="Share your crypto strategy..."
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
                        className="bg-warm-gold/20 text-deep-teal hover:bg-warm-gold/30"
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
