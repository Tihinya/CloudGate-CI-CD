import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
  entry: './app/server.js', // Entry point of the application
  target: 'node',
  output: {
    path: path.resolve('build'), // Output directory path
    filename: 'bundle.js', // Output bundle file name
    publicPath: './',
  },
  resolve: {
    extensions: ['.js'],
  },
  externals: [nodeExternals()],
};
