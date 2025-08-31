"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, DollarSign, Users } from "lucide-react"

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

export default function PhysicalAssetsCommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "GoldBugGary",
      avatar: "/placeholder.svg?height=40&width=40&text=GBG",
      title: "My 20% Precious Metals Allocation Strategy",
      content:
        "After 15 years of collecting, here's my physical precious metals strategy:\n\n**Current Allocation (20% of net worth):**\n- 70% Gold (coins and bars)\n- 25% Silver (mostly coins)\n- 5% Platinum (bars only)\n\n**Storage Strategy:**\n- 60% in bank safety deposit boxes\n- 30% in home safe (fireproof, hidden)\n- 10% in allocated storage (BullionVault)\n\n**Buying Strategy:**\n- Dollar-cost average $500/month\n- Buy more during market crashes\n- Focus on government coins (Eagles, Maples)\n- Avoid numismatic premiums\n\n**Why Physical vs ETFs:**\n- True ownership and control\n- No counterparty risk\n- Insurance against system collapse\n- Hedge against currency debasement\n\nPMs have saved my portfolio during every major crisis!",
      likes: 167,
      comments: 34,
      timeAgo: "5 hours ago",
      tags: ["Gold", "Silver", "Precious Metals", "Physical Storage"],
      isLiked: false,
      showComments: false,
      commentsList: [],
    },
    {
      id: "2",
      author: "CommodityCarl",
      avatar: "/placeholder.svg?height=40&width=40&text=CC",
      title: "Commodity Investing: Beyond Gold and Silver",
      content:
        "Diversifying beyond precious metals into other physical commodities:\n\n**My Commodity Portfolio:**\n- Copper (industrial demand growing)\n- Palladium (automotive catalysts)\n- Uranium (nuclear energy revival)\n- Agricultural land (farmland REIT + direct ownership)\n- Timber (sustainable resource)\n\n**Investment Vehicles:**\n- Physical: Only for precious metals\n- ETFs: For industrial metals (COPX, PALL)\n- Futures: For agricultural commodities\n- Direct ownership: 40 acres farmland in Iowa\n\n**Thesis:**\n- Inflation hedge across multiple sectors\n- Supply constraints in many commodities\n- Green energy transition needs materials\n- Food security becoming critical\n\n**Performance (3 years):**\n- Copper: +45%\n- Farmland: +23%\n- Uranium: +89%\n- Timber: +31%\n\nDiversification within alternatives is key!",
      likes: 143,
      comments: 28,
      timeAgo: "7 hours ago",
      tags: ["Commodities", "Copper", "Farmland", "Uranium", "Diversification"],
      isLiked: true,
      showComments: false,
      commentsList: [],
    },
    {
      id: "3",
      author: "CollectibleKate",
      avatar: "/placeholder.svg?height=40&width=40&text=CK",
      title: "Alternative Assets: My Art & Collectibles Journey",
      content:
        "5 years into collecting alternative physical assets. Here's what I've learned:\n\n**My Collection:**\n- Vintage watches (Rolex, Omega): $45K invested, now worth $67K\n- Classic cars (1967 Mustang): $25K invested, now worth $38K\n- Fine art (local artists): $15K invested, now worth $22K\n- Rare books (first editions): $8K invested, now worth $12K\n- Sports cards (vintage): $12K invested, now worth $31K\n\n**Key Lessons:**\n- Buy what you love AND understand\n- Authentication is everything\n- Storage and insurance costs add up\n- Liquidity can be challenging\n- Market timing matters more than stocks\n\n**Best Performers:**\n- Sports cards (pandemic boom)\n- Vintage watches (luxury demand)\n- Classic cars (nostalgia premium)\n\n**Worst:**\n- Contemporary art (too speculative)\n\nOnly invest what you can afford to lose!",
      likes: 98,
      comments: 19,
      timeAgo: "9 hours ago",
      tags: ["Collectibles", "Watches", "Classic Cars", "Art", "Alternative Assets"],
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
      <section className="py-12 px-4 text-deep-teal bg-orange-100">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-deep-teal rounded-xl">
                <DollarSign className="h-8 w-8 text-warm-gold" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Physical Assets Community</h1>
                <p className="text-lg opacity-90 mt-2">
                  Discuss precious metals, commodities, and tangible investments
                </p>
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {isJoined ? "8.9k members" : "8.8k members"}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    1.2k posts this month
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
                          placeholder="Share your physical asset strategy..."
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Tell the community about your investments, tips, or questions..."
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
