import TagList from "../components/TagList"
import { API_URL } from "../constants"
import useFetch from "../hooks/useFetch"

const Home = () => {
  const get_tags_url = API_URL + "/tag"
  const { error, isPending, data } = useFetch(get_tags_url)
  const { tags } = data ?? {}

  return (
    <section className="mx-auto max-w-[900px]">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {tags && <TagList tags={tags} title="select tags" />}
    </section>
  )
}

export default Home
