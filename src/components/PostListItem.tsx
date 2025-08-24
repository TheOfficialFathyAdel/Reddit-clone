import { Image, Pressable, Text, View } from "react-native";
import moment from "moment";
import tw from "twrnc";
import { Post } from "./types";
import {
  ArrowBigDown,
  ArrowBigUp,
  MessageSquare,
  Share,
  Trophy,
} from "lucide-react-native";

interface PostListItemProps {
  post: Post;
}

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <View style={tw`px-4 py-4  mt-2`}>
      {/* POST HEADER */}
      <View style={tw`flex-row items-center gap-1`}>
        <Image
          source={{ uri: post.group.image || "" }}
          style={tw`h-9 w-9 rounded-full`}
        />
        <Text style={tw`font-bold text-base`}>{post.group.name}</Text>
        <Text style={tw`text-gray-500 text-base`}>
          {moment(post.created_at).fromNow()}
        </Text>
        <Pressable style={tw`bg-[#0d469b] rounded-full ml-auto`}>
          <Text style={tw`text-white font-bold px-4 py-2`}>Join</Text>
        </Pressable>
      </View>

      {/* Content */}
      <Text style={tw`font-bold text-2xl mt-2`}>{post.title}</Text>
      {post.image && (
        <Image
          source={{ uri: post.image }}
          style={tw`mt-2 rounded-xl w-full aspect-4/3 `}
        />
      )}
      {!post.image && post.description && (
        <Text style={tw`text-base mt-2 font-semibold`} numberOfLines={4}>
          {post.description}
        </Text>
      )}

      {/* Footer */}
      <View style={tw`flex-row items-center gap-2 mt-4`}>
        <View
          style={tw`border border-1 flex-row border-gray-100 rounded-full p-1 items-center`}
        >
          <ArrowBigUp size={25} />
          <Text style={tw`font-bold text-base`}>{post.upvotes}</Text>
          <ArrowBigDown size={25} style={tw`ml-4`} />
        </View>
        <View
          style={tw`border border-1 flex-row gap-1 border-gray-100 rounded-full p-1 px-6 items-center`}
        >
          <MessageSquare />
          <Text style={tw`font-bold text-base`}>{post.nr_of_comments}</Text>
        </View>
        <View
          style={tw`border border-1  border-gray-100 rounded-full py-1 px-6 ml-auto`}
        >
          <Trophy size={25} />
        </View>
        <View
          style={tw`border border-1  border-gray-100 rounded-full py-1 px-6`}
        >
          <Share size={25} />
        </View>
      </View>
    </View>
  );
}
