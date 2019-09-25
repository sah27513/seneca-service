const path = require("path");

module.exports = {
  webpack: config => {
    // Set the Library Name
    const library = "seneca-service";

    // Set the Resolve Paths
    config.resolve = {
      extensions: [".js", ".json"],
      modules: ["node_modules"],
      alias: {
        lib: path.resolve(__dirname, "src/lib/")
      }
    };

    // Set the Output file/directory
    config.output = {
      path: path.join(__dirname, "lib"),
      filename: `${library}.js`,
      library,
      libraryTarget: "commonjs2",
      libraryExport: "default"
    };

    // Return the modified config
    return config;
  }
};
