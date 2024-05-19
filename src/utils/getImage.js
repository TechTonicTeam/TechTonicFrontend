import logo from '../icons/logo.svg'
import circleTop from '../icons/circle-top.png'
import circleBot from '../icons/circle-bottom.png'
import report from '../icons/report.png'
import human from '../icons/human.png'
import exit from '../icons/exit.png'
import voting from '../icons/voting.png'
import burgerStyle from '../icons/burgerStyle.png'
import sortIcon from '../icons/sortIcon.png'
import filterIcon from '../icons/filterIcon.png'
import likeFill from '../icons/likeFill.svg'
import like from '../icons/like.svg'
import comment from '../icons/comment.svg'
import arrowDown from '../icons/arrowDown.png'
import search from '../icons/search.svg'
import send from '../icons/sendButton.svg'
import cross from '../icons/cross.svg'
import clip from '../icons/clip.svg'

const images = {
    logo,
    circleTop,
    circleBot,
    report,
    human,
    exit,
    voting,
    burgerStyle,
    sortIcon,
    filterIcon,
    like,
    likeFill,
    comment,
    arrowDown,
    search,
    send,
    cross,
    clip
}

function getImage(key) {
    return images[key]
}

export default getImage;