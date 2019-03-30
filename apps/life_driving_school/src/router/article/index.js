// const Article = () => import(`@views/life_school/article/article.vue`);
// const Detail = () => import(`@views/life_school/article/detail.vue`)

const article = {
	path: '/article/:type',
	name: 'article',
	component: resolve => require(['@views/article/article.vue'], resolve),
	children: [{
		path: 'detail',
		name: 'article-detail',
		component: resolve => require(['@views/article/detail.vue'], resolve),
	}]
};

export default article;
