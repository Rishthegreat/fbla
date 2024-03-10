/* eslint-disable */

export const designChoices = {
    primary: '#f0a53f',
    secondary: '#35c0c3',
    tertiary: '#262666',
    offWhite: '#f3e5d4',
    white: '#fcfaf7',
    almostGrey: '#00214d',
    almostBlack: '#1c1c2c',
    success: '#66f6a9',
    error: '#ef6262',
    defaultText: '#212121'
}

export const backendLink = 'http://10.0.2.2:5000/graphql' // Make sure you change this for production
// This is not the actual ip address its just that whn you use an emulator, then you use this ip to access local machine's localhost
export const uploadPictureLink = 'http://10.0.2.2:5000/upload'
export const getPictureLink = 'http://10.0.2.2:5000/images'
export const profileSectionsSchema = { // remember to change this if backend is changed
    school: {items:['name'], label:'Current School'},
    colleges: {items:['name'], label:'Colleges'},
    classes: {items:['name'], label:'Classes'},
    tests: {items:['name', 'score'], label:'Tests'},
    clubs: {items:['name', 'position', 'description'], label:'Clubs'},
    jobsInternships: {items:['position', 'company', 'description'], label:'Jobs and Internships'},
    communityServices: {items:['position', 'company', 'description'], label:'Community Service'},
    awards: {items:['name', 'organization', 'description'], label:'Awards'},
    activities: {items:['name', 'description'], label:'Activities'}
}

export const timestampToTimeAgo = (timestamp) => {
    const time = new Date(timestamp)
    const now = new Date()
    const diff = now - time
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(weeks / 4)
    const years = Math.floor(months / 12)
    if (years > 0) {
        return years + " years ago"
    } else if (months > 0) {
        return months + " months ago"
    } else if (weeks > 0) {
        return weeks + " weeks ago"
    } else if (days > 0) {
        return days + " days ago"
    } else if (hours > 0) {
        return hours + " hours ago"
    } else if (minutes > 0) {
        return minutes + " minutes ago"
    } else if (seconds > 0) {
        return seconds + " seconds ago"
    } else {
        return "1 second ago"
    }
}
