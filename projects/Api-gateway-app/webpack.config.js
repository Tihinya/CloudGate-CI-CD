import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
  entry: './app/server.js',
  target: 'node',
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js',
    publicPath: './',
  },
  resolve: {
    extensions: ['.js'],
  },
  externals: [nodeExternals()],
};
