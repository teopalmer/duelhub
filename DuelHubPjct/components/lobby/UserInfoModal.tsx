import { useState, FC, useEffect } from "react";
import { AxiosError } from "axios";

import { cn } from "@/lib/utils";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Modalow from "@/components/shared/Modalow";
import useRequest from "@/hooks/useRequest";
import useUser from "@/hooks/useUser";
import { UserInfo, putUserinfoEndpoint } from "@/requests/users";
import { useToast } from "../shared/Toast";

type UserInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UserInfoModal: FC<UserInfoModalProps> = ({ isOpen, onClose }) => {
  const [isOpenModal, setIsOpenModal] = useState(isOpen);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [originalUserInfo, setOriginalUserInfo] = useState<UserInfo>(); // 取消編輯時可以回復原先資料
  const [errorMsg, setErrorMsg] = useState({ nickname: "" });
  const { fetch } = useRequest();
  const { getCurrentUser } = useUser();
  const toast = useToast();

  const hasError = errorMsg.nickname !== "";

  const handleClose = () => {
    setIsOpenModal((prev) => !prev);
    setTimeout(() => onClose(), 200); // 要等 modalow 關閉動畫結束，才能關閉
  };
  const handleCancelEdit = () => {
    setEditMode(false);
    setErrorMsg({ nickname: "" }); // Reset error message
    setUserInfo(originalUserInfo); // Restore the original user info
  };
  const handleSubmit = async () => {
    if (hasError) return;
    if (!userInfo) return;
    try {
      setLoading(true);
      await fetch(putUserinfoEndpoint(userInfo), { toast: { show: false } });
      setOriginalUserInfo(userInfo); // Update the original user info
      handleClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(
          { state: "error", children: error.response?.data.message },
          {
            position: "bottom-left",
          }
        );
      } else {
        toast(
          { state: "error", children: `Unexpected arrow： ${error}` },
          {
            position: "bottom-left",
          }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNicknameChange = (value: string) => {
    if (!userInfo) return;
    setUserInfo((prev) => ({ ...prev!, nickname: value }));
    const regex = /^[a-zA-Z0-9\u4E00-\u9FFF ]*$/; // Regex pattern for special characters. Allow only alphanumeric and spaces
    if (value.length === 0) {
      setErrorMsg((prep) => ({ ...prep, nickname: "Can't be none" }));
    } else if (!regex.test(value)) {
      setErrorMsg((prep) => ({ ...prep, nickname: "Strange symbols" }));
    } else if (value.length < 4) {
      setErrorMsg((prep) => ({ ...prep, nickname: "Too short" }));
      return;
    } else if (value.length > 16) {
      setErrorMsg((prep) => ({ ...prep, nickname: "Too long" }));
      return;
    } else {
      setErrorMsg((prep) => ({ ...prep, nickname: "" }));
    }
  };

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setUserInfo(user);
      setOriginalUserInfo(user); // Save the original user info
    })();
  }, []);

  return (
    <>
      <Modalow
        hasTitle={false}
        isOpen={isOpenModal}
        onClose={handleClose}
        maskClosable={!loading}
        size="xLarge"
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">Profile</div>
            <div className="flex gap-5 items-center">
              {editMode ? (
                <>
                  <Button
                    disabled={hasError}
                    className="flex justify-center rounded-sm"
                    onClick={handleSubmit}
                    loading={loading}
                  >
                    Save
                  </Button>
                  <Button
                    className="flex justify-center rounded-sm"
                    onClick={handleCancelEdit}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  className="flex justify-center rounded-sm"
                  onClick={() => setEditMode((prev) => !prev)}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 my-12">
            {userInfo && (
              <>
                <div className="flex items-start h-12">
                  <div className="w-[100px] border-l-2 border-blue2f pl-2">
                    Username
                  </div>
                  {editMode ? (
                    <div className="w-full">
                      <Input
                        className={cn("flex flex-col")}
                        disabled={loading}
                        inputClassName={cn(
                          "rounded-[10px] w-full border border-dark29",
                          "focus:border-blue2f transition-[border-color] duration-300 ease-in-out"
                        )}
                        errorClassName={cn("w-full flex justify-end")}
                        value={userInfo.nickname}
                        onChange={handleNicknameChange}
                        error={hasError}
                        errorMessage={errorMsg.nickname}
                      />
                    </div>
                  ) : (
                    <div className="w-full px-3 py-0.5">
                      {userInfo.nickname}
                    </div>
                  )}
                </div>
                <div className="flex items-start h-12">
                  <div className="w-[100px] border-l-2 border-blue2f pl-2">
                    Email
                  </div>
                  <div className="w-full px-3 py-0.5">{userInfo.email}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </Modalow>
    </>
  );
};

export default UserInfoModal;
