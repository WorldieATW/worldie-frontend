import { BsChatLeftDots } from 'react-icons/bs'
import { CommentsProps } from '../interface'
import { CommentCard } from '../module-elements'

export const Comments: React.FC<CommentsProps> = ({
  comments,
  // commentsChanged,
  // setCommentsChanged,
}) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-row gap-4 items-center px-7">
        <BsChatLeftDots className="w-4 h-4" />
        <p className="font-paytone text-lg">Comments</p>
      </div>

      {comments ? (
        comments.map((worldPost) => (
          <CommentCard
            worldPost={worldPost}
            // commentsChanged={commentsChanged}
            // setCommentsChanged={setCommentsChanged}
            isDetail={false}
          />
        ))
      ) : (
        <div className="px-7">{/* TODO: ketika belum ada komenn */}</div>
      )}
    </section>
  )
}
