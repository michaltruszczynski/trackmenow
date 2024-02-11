import TrackMe from "./TrackMeKnow/index";

document.addEventListener("DOMContentLoaded", (event) => {

    async function start() {
        const trackMeNowAppContainer = document.querySelector<HTMLElement>('.container')
        if (trackMeNowAppContainer) {
            const trackMeknowApp = new TrackMe(trackMeNowAppContainer)
            try {
                await trackMeknowApp.startApp()
            } catch (error) {
                console.log(error)
            }
        }
    }

    start()

})