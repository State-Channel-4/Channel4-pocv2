import { API_URL } from '../constants'
import useFetch from '../hooks/useFetch'
import TagList from '../components/TagList'

const Home = () => {
  const get_tags_url = API_URL + "/tag"
  const { error, isPending, data: tags } = useFetch(get_tags_url)
  console.log("tags : ", tags)

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { tags && <TagList tags={tags} title="select tags"/>}
    </div>
  )
}

export default Home