import { FlatList, View } from "react-native";
import posts from "@/assets/data/posts.json";
import PostListItem from "@/src/components/PostListItem";
import tw from "twrnc";
export default function HomeScreen() {
  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </View>
  );
}
