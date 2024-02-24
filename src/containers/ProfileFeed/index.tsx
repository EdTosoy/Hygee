import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "hooks";
import { format } from "date-fns";
import { ToggleContext } from "context";
import { EditPost } from "features";
import { Profile, IconContainer } from "components";
import { deletePost, getUserPosts } from "src/features/posts/api.ts";
import { selectAllUserPosts } from "src/features/posts/selectors";
import { selectUserInfo } from "src/features/auth/selectors";
import { Post } from "src/features/posts/types";
import { UserInfo } from "src/features/auth/types";
import { ToggleContextType } from "@types";
import { DATE_AND_TIME } from "src/constants";

export function ProfileFeed() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const userPosts = useAppSelector(selectAllUserPosts) as Post[];
  const userInfo = useAppSelector(selectUserInfo) as UserInfo;

  const { toggleModal, setModalContent } = useContext(
    ToggleContext,
  ) as ToggleContextType;
  const [posts, setPosts] = useState<any[]>([]);

  const AllPostWithShowOptions =
    userPosts.length &&
    userPosts.map((post) => {
      return { ...post, showOptions: false };
    });

  useEffect(() => {
    const getAllPosts = async () => {
      await dispatch(getUserPosts()).unwrap();
    };
    getAllPosts();
  }, []);

  useEffect(() => {
    setPosts(AllPostWithShowOptions || []);
  }, [userPosts.length]);

  const postFeed = () => {
    return posts?.map((post: Post & { showOptions: boolean }, index) => {
      const {
        _id,
        username,
        content,
        title,
        likesCount,
        commentsCount,
        createdAt,
        sharesCount,
        showOptions,
      } = post;

      const isUserAuthorizedToManipulatePost =
        userInfo && userInfo._id === post.userId;

      const toggleShowOptions = () => {
        const newPosts = [...posts];
        if (newPosts[index].showOptions === true) {
          newPosts[index].showOptions = false;
        } else {
          newPosts.map((post) => (post.showOptions = false));
          newPosts[index].showOptions = true;
        }
        setPosts(newPosts);
      };
      const handleEditPost = () => {
        setModalContent(<EditPost contentValue={content} postId={_id} />);
        toggleModal();
      };
      const handleDeletePost = async () => {
        await dispatch(deletePost({ postId: _id })).unwrap();
        window.location.reload();
      };
      return (
        <div
          key={_id}
          className=" border-b border-light-gray relative"
          onClick={() => setPosts(AllPostWithShowOptions || [])}
        >
          <div className="flex justify-between my-4 items-center">
            <Profile
              userProfile={{ username }}
              date={format(createdAt, DATE_AND_TIME)}
            />
            <IconContainer
              className="text-xl "
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleShowOptions();
              }}
            >
              <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
            </IconContainer>
            {showOptions && (
              <div className="w-195 border border-light-gray bg-white z-10 absolute top-8 -right-4 rounded-md shadow-2xl text-sm ">
                {isUserAuthorizedToManipulatePost ? (
                  <>
                    <div
                      className="p-5 border-b border-light-gray cursor-pointer"
                      onClick={handleEditPost}
                    >
                      {t("translation.button.editPost")}
                    </div>
                    <div
                      className="p-5 border-b border-light-gray cursor-pointer"
                      onClick={handleDeletePost}
                    >
                      {t("translation.button.deletePost")}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-5 border-b border-light-gray cursor-pointer">
                      {t("translation.button.hide")}
                    </div>
                    <div className="p-5 border-b border-light-gray cursor-pointer">
                      {t("translation.button.report")}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <h1 className="font-semibold">{title}...</h1>
          <p>{content}</p>
          <div className="flex justify-between my-7">
            <div className="flex gap-1 text-xl items-center">
              <IconContainer>
                <ion-icon name="heart-outline"></ion-icon>
              </IconContainer>
              <p className="text-sm">{likesCount}</p>
            </div>
            <div className="flex gap-1 text-xl items-center">
              <IconContainer>
                <ion-icon name="chatbox-outline"></ion-icon>
              </IconContainer>
              <p className="text-sm">{commentsCount}</p>
            </div>
            <div className="flex gap-1 text-xl items-center">
              <IconContainer>
                <ion-icon name="image-outline"></ion-icon>
              </IconContainer>
              <p className="text-sm">{sharesCount}</p>
            </div>
          </div>
        </div>
      );
    });
  };
  return <div>{userPosts?.length > 0 && postFeed()}</div>;
}