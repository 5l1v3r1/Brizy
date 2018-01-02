<?php
/**
 * Created by PhpStorm.
 * User: alex
 * Date: 8/1/17
 * Time: 10:26 AM
 */

class Brizy_Config {

	const EDITOR_PRIMARY_URL = 'http://api.brizy.io';
	//const COMPILER_URL = 'http://api.brizy.iox';

	const BRIZY_WP_ASSET_PATH = 'uploads/brizy/pages/%s/';

	const LOCAL_PAGE_MEDIA_STATIC_URL = '/wp-content/uploads/brizy/media';
	const LOCAL_PAGE_ASSET_STATIC_URL = '/wp-content/uploads/brizy/pages';
	const BRIZY_WP_PAGE_ASSET_PATH = 'wp-content/uploads/brizy/pages/%s';

	const LOCAL_EDITOR_ASSET_STATIC_URL = '/wp-content/uploads/brizy/editor';
	const BRIZY_WP_EDITOR_ASSET_PATH = '/wp-content/uploads/brizy/editor/%s';

	//const BRIZY_S3_ASSET_URL = BRIZY_ENV == 'dev'?'http://editor:3000/static':'https://s3.amazonaws.com/bitblox-test/%s/%s';

	//const ASSETS_PATTERN = '/(https?:\/\/bitblox.local\/assets\/[a-z|0-9|\/|\*|\.]+\.[png|gif|bmp|jpg|jpeg]+)/i';

	const EDITOR_BASE_URL = 'http://www.testblox.info';
	const EDITOR_INTEGRATION_URL = 'http://integration.bitblox.site';
	const MEDIA_IMAGE_PATH = '/storage/media';
	//const MEDIA_IMAGE_URL = 'https://static.bitblox.me/storage/media';
	const MEDIA_IMAGE_URL = 'https://platform-admin.brizy.io/storage/media';
	const EDITOR_ORIGIN_URL = 'http://testblox.info';

	const EDITOR_HOST_API = 'api.testblox.info';
	const EDITOR_HOST_BASE = 'www.testblox.info';
	const EDITOR_HOST_ORIGIN = 'testblox.info';
	const EDITOR_HOST_PRIMARY = 'testblox.info';

	const GATEWAY_URI = 'http://api.brizy.io';

	const BRIZY_ID = '2_5to57xuihv48c4s400sk0wgwcw0gg4s4ggwccos4g4c4444occ';
	const BRIZY_KEY = '3kfsu3y91csg08oskg8kowg4844go0o88sow48c00wwsgwk00s';
	const BRIZY_EMAIL = 'admin@admin.com';
	const BRIZY_PASSWORD = 'admin';

	static function  BRIZY_S3_ASSET_URL() {
		return BRIZY_ENV == 'dev'?'http://editor:3000/static':'https://s3.amazonaws.com/bitblox-test/%s/%s';
	}

	static function  EDITOR_STATIC_URL() {
		return BRIZY_ENV == 'dev'?'http://editor:3000/static':'http://api.brizy.io/static';
	}
}