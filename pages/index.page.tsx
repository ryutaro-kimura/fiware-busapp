import { useRouter } from 'next/router'
import { useEffect } from 'react'

type Props = { data: Array<string> }

export default function Home({ ...props }: Props) {
  const router = useRouter()
  useEffect(() => {
    router.push('/map')
  }, [router.asPath])

  return (
    <>
      <p>Loading..</p>
    </>
  )
}
