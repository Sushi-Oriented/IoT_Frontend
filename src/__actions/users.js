import { CONSTANTS, IRequest, SERVER, Auth } from '../api';

export const UsersActions = {
    getListUser,
    registerUser,
    updateUser,
    deleteUser,
    getPicture,
};

async function getListUser(dispatches) {
    try {
        let result = await IRequest.GetQuery(SERVER.API.AppUser.ListUser)
        dispatches({ type: CONSTANTS.USER.LIST_SUCCESS, data: result })

    } catch (error) {
        console.log(error)
    }
}
async function registerUser(param) {
    console.log(param)
    try {
        // if (
        //     !(
        //       Object.keys(param.pictureValue).length === 0 &&
        //       param.pictureValue.constructor === Object
        //     )
        //   ) {
        //     let picture = await IRequest.UploadFile(
        //       SERVER.API.AppUser.UploadUserPicture,
        //       param.pictureValue
        //     );
        //     param.picture = picture.result.files.file[0].name;
        //   }
          let url = ''
          if(param.userRole === 'admin'){
            url = SERVER.API.AppUser.RegisterAdmin
        }
        else if(param.userRole === 'manager'){
            url = SERVER.API.AppUser.RegisterManager
        }

        let result = await IRequest.Post(url, param)
        return Promise.resolve(result)
    } catch (error) {
        // console.log(error)
        return Promise.reject(error)
    }
}
async function updateUser(userid, param,pictureValue) {
    console.log(userid,param,pictureValue)
    try {

        if (
            !(
              Object.keys(param.pictureValue).length === 0 &&
              param.pictureValue.constructor === Object
            )
          ) {
            let picture = await IRequest.UploadFile(
              SERVER.API.AppUser.UploadUserPicture,
              param.pictureValue
            );
            param.picture = picture.result.files.file[0].name;
          }

        let result = await IRequest.Post(SERVER.API.AppUser.UpdateById(userid), param)
        console.log(result)
        return Promise.resolve(result)
    } catch (error) {
        // console.log(error)
        return Promise.reject(error)
    }
}

async function deleteUser(id) {
    try {
        console.log(id)
        let result = await IRequest.Delete(SERVER.API.AppUser.RemoveUser(id))
        return Promise.resolve(result)
    } catch (error) {
        return Promise.reject(error)
    }
}

function getPicture(fileName) {
    return SERVER.API.AppUser.GetUserPicture(fileName) + '?access_token=' + Auth.getAuthUserAccessToken()
}
