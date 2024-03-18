import { v4 as uuidv4 } from 'uuid'

export const generateIdentifer = () => {
	    const uuid = uuidv4()
	    return uuid.replace(/-/g, '').substring(0, 5)
}