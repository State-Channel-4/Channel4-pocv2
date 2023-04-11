import useFetch from "../hooks/useFetch";
import TagList from "../components/TagList"

const Home = () => {
  const { error, isPending, data: tags } = useFetch('https://grove-instinctive-responsibility.glitch.me/api/tag')
  console.log("tags : ", tags)

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { tags && <TagList tags={tags} />}
    </div>
  );
}
 
export default Home;