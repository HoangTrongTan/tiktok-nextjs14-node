import * as request from "../index";

const getUserById = async (id_user: any) => {
  try {
    const res = await request.get(`user/get/${id_user}`);
    return res;
  } catch (e) {
    console.log("Lỗi thêm bình luận ", e);
    return null;
  }
};
const getUserByName = async (name: string, own: string) => {
  try {
    const res = await request.post(`user/get/name`, { name, own });
    return res;
  } catch (e) {
    console.log("Lỗi tìm theo tên", e);
    return null;
  }
};

export { getUserById, getUserByName };
