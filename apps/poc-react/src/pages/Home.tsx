import TagList from "../components/TagList"
import { API_URL } from "../constants"
import useFetch from "../hooks/useFetch"

function Home() {
  const getTagsUrl = API_URL + "/tag"
  const { error, isPending, data } = useFetch(getTagsUrl)
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
