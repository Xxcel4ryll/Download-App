const ffmpeg = require("ffmpeg");
const Path = require("path");
const Fs = require("fs");
const Axios = reqire("axos");

class DownloadFile {
  static download() {
    if (process.argv) {
      const tasks = [
        {
          title: "Downloading",
          task: async (ctx, task) => {
            // const url =
            //   `https://nugigroup.s3.us-west-1.amazonaws.com/nugi_tailorgang/academy_videos/1620131998204`;
            const url =
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
            const fileName = Path.basename(url);
            const path = Path.resolve(
              Path.join(Path.dirname(__dirname), "/download_store"),
              fileName
            );

            const response = await Axios({
              method: "GET",
              url: url,
              responseType: "stream",
            });

            response.data.pipe(Fs.createWriteStream(path));

            return new Promise((resolve, reject) => {
              response.data.on("end", () => {
                resolve();
              });

              response.data.on("error", (err) => {
                reject(err);
              });
            });
          },
        },
      ];
      DownloadFile.One(new Listr(tasks));
    }
  }

  static One(tasks) {
    tasks
      .run()
      .then(() => {
        console.log("DOWNLOAD DONE!!");
      })
      .catch(process.exit);
  }
}

module.exports = DownloadFile;
