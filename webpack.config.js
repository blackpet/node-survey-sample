const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDir = 'dist';

/**
 * @param env --env options
 * @param options all of command line arguments (cf. --mode)
 */
module.exports = (env, options) => {
    const config = {
        mode: 'development',
        node: {
            fs: 'empty'
        },
        entry: {
            player: './src/client/player.js',
            'realtime-survey-tutor': './src/client/realtime-survey/realtime-survey-tutor.js',
            'realtime-survey-student': './src/client/realtime-survey/realtime-survey-student.js',
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, outputDir),
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, 'src/client')],
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                }
            ]
        }
    };

    const mode = options.mode || config.mode;

    // mode configuration
    if(mode === 'development') {
        config.plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title: 'Development',
                showErrors: true // 에러 발생 시 메세지를 화면에 출력!
            })
        ];

        config.devtool = 'inline-source-map'; // auto generating index.html

        config.devServer = {
            port: 3000,
            contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'static')], // 개발서버의 root path
            proxy: {
                '/api': {
                    target: 'http://localhost:3001',
                    pathRewrite: {'^/api': ''}
                },
                '/socket.io': {
                    target: 'http://localhost:3001',
                    ws: true
                }
            },
            hot: true, // enable HMR (Hot Module Replacement: 코드 변경 시 변경 모듈만 runtime 에서 교체)
            host: '0.0.0.0', // default: 'localhost', localhost 는 원격접속이 안된다! 원격 접속이 가능하도록 IP 구성으로 설정하자!
        }
    } else {
        // production mode
        config.plugins = [
            new CleanWebpackPlugin()
        ]
    }


    return config;
}
