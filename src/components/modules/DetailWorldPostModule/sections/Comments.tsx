import { BsChatLeftDots } from 'react-icons/bs'
import { CommentsProps } from '../interface'
import { CommentCard } from '../module-elements'
import { Image, Skeleton } from '@chakra-ui/react'

export const Comments: React.FC<CommentsProps> = ({
  comments,
  //commentsChanged,
  //setCommentsChanged,
}) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-row gap-4 items-center px-7">
        <BsChatLeftDots className="w-4 h-4" />
        <p className="font-paytone text-lg">Comments</p>
      </div>

      {comments ? (
        (comments.length > 0) ? (
          comments.map((worldPost) => (
            <CommentCard
              key={worldPost.id}
              worldPost={worldPost}
              //commentsChanged={commentsChanged}
              //setCommentsChanged={setCommentsChanged}
              isDetail={false}
            />
          ))
        ) : (
          <div className="flex flex-col gap-3 items-center py-7">
            <Image src="/no-comment-yet.png" boxSize="200px" />
            <p className="font-semibold text-m">No comments yet. Start the conversation!</p>
          </div>
        )
      ) : (
        <div className="px-7">
          <Skeleton height={400} />
        </div>
      )}
    </section>
  )
}
