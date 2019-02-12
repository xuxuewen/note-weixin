/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
/* eslint import/extensions: 0 */
/* eslint import/first: 0 */
/* eslint import/no-unresolved: 0 */
import React from 'react';
import ModLoader from './ModLoader';
import HomeRoutes from 'bundle-loader?lazy&name=[name]!./home/HomeRoutes';
import PlayChatRoutes from 'bundle-loader?lazy&name=[name]!./playchat/PlayChatRoutes';

export const HomeRoutesLoader = () => (
    <ModLoader mod={HomeRoutes}/>
);
export const PlayChatLoader = () => (
  <ModLoader mod={PlayChatRoutes} />
);
