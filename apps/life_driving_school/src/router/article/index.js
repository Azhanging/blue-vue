const Article = () => import(`@views/article/article.vue`);
const Detail = () => import(`@views/article/detail.vue`)
// resolve => require(['components/im/im'], resolve)
const article = {
	path: '/article/:type',
	name: 'article',
	component: Article,
	children: [{
		path: 'detail',
		name: 'article-detail',
		component: Detail
	}]
};

export default article;
