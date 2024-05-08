import { UpdateUserData } from "../models/user/updateUserData";


type accessFields = {
    clause: string,
    values: string[]
}

export function accessFieldsFilter(data: object, allowedUpdates: string[]): accessFields | undefined {
    const updateKeys = Object.keys(data).filter(
        (key) => allowedUpdates.includes(key) && data[key] !== ""
    );

    if (updateKeys.length === 0) return undefined

    const clause = updateKeys
        .map((key, index) => `${key} = $${index + 2}`)
        .join(", ");

    const values = updateKeys.map((key) => data[key]);

    return {clause, values}
}