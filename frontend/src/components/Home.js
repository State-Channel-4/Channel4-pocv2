import useFetch from "../hooks/useFetch";
import TagList from "../components/TagList"
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { error, isPending, data: tags } = useFetch('https://grove-instinctive-responsibility.glitch.me/api/tag')
  console.log("tags : ", tags)
  const navigate = useNavigate()

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { tags && <TagList tags={tags} title="select tags"/>}
      <p>Please select at least one tag to discover content</p>
      { tags && <button onClick={() => {
        navigate("/discover", {/*params goes here */})
      }}>discover</button>}
    </div>
  );
}
 
export default Home;