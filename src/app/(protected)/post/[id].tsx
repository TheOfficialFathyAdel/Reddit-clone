import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import posts from "@/assets/data/posts.json";
import tw from "twrnc";
import PostListItem from "@/src/components/PostListItem";

export default function DetailedPost() {
  const { id } = useLocalSearchParams();

  const post = posts.find((post) => post.id == id);

  if (!post) {
    return <Text>Post Not found</Text>;
  }

  return (
    <View style={tw`bg-white flex-1`}>
      <PostListItem post={post} isDetailedPost />
    </View>
  );
}
