import { CONSTANTS, IRequest, SERVER } from '../api';

export const UsersActions = {
    getListUser,
    registerUser,
    updateUser,
    removeUser
};

async function getListUser(dispatch) {
    try {
        let result = await IRequest.GetQuery(SERVER.API.AppUser.ListManager)
        dispatch({ type: CONSTANTS.USER.LIST_SUCCESS, data: result })
    } catch (error) {
        console.log(error)
    }
}
async function registerUser(role, param) {
    try {
        let url = ''
        if (role === CONSTANTS.ROLE.ADMIN) {
            url = SERVER.API.AppUser.RegisterAdmin
        }else if (role === CONSTANTS.ROLE.MANAGER) {
            url = SERVER.API.AppUser.RegisterManager
        }else if (role === CONSTANTS.ROLE.SUPERVISOR) {
            url = SERVER.API.AppUser.RegisterSupervisor
        }else if (role === CONSTANTS.ROLE.NORMALUSER) {
            url = SERVER.API.AppUser.RegisterNormalUser
        }

        let result = await IRequest.Post(url, param)
        return Promise.resolve(result)
    } catch (error) {
        // console.log(error)
        return Promise.reject(error)
    }
}
async function updateUser(userid, param) {
    try {
        // let result = await IRequest.Patch(SERVER.API.AppUser.UpdateById(userid), param)
        let result = await IRequest.Post(SERVER.API.AppUser.UpdateUser(userid), param)
        return Promise.resolve(result)
    } catch (error) {
        // console.log(error)
        return Promise.reject(error)
    }
}
async function removeUser(userid) {
    try {
        let result = await IRequest.Delete(SERVER.API.AppUser.RemoveUser(userid))
        return Promise.resolve(result)
    } catch (error) {
        // console.log(error)
        return Promise.reject(error)
    }
}