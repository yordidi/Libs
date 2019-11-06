import React from 'react'
import propTypes from 'prop-types'
import createReactClass from 'create-react-class'

import { 
	Navbar, 
	NavItem, 
	Icon, 
	Button, 
	Collection, 
	CollectionItem,
	Modal,
	Card,
	CardTitle,
	Row,
	Col,
	ProgressBar
} from 'react-materialize'

const styles = {
	buttonWraper: {
		display: 'flex', 
		justifyContent: 'flex-end',
		margin: '20px' 
	},
	collectionItem: {
		display: 'flex',
		justifyContent: 'space-between',
	}
}

class Multiple extends React.Component {
	constructor(props) {
		super(props);
		this.state = { tableData: [] }
	}
	componentDidMount() {
				let _this = this;
				let uploader = Qiniu.uploader({
				    runtimes: 'html5,flash,html4',
				    browse_button: 'pickfiles',
				    container: 'container',
				    drop_element: 'container',
				    max_file_size: '1000mb',
				    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
				    dragdrop: true,
				    chunk_size: '4mb',
				    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase()==="ios"),
				    uptoken_url: '/uptoken',
				    domain: 'http://onxjs42u3.bkt.clouddn.com/',
				    get_new_uptoken: false,
				   
				    auto_start: true,
				    log_level: 5,
				    init: {
				        'BeforeChunkUpload':function (up,file) {
				            console.log("before chunk upload:",file.name);
				        },
				        'FilesAdded': function(up, files) {
				        	const { tableData } = _this.state
		        	   	let newTableData = files.map(file => {
		        	   		return {
		        	   			name: file.name,
		        	   			size: file.size,
		        	   			loading: '等待上传',
		        	   			progress: 0
		        	   		}
		        	   	})
	        	      _this.setState({ tableData: tableData.concat(newTableData) })
				        },
				        'BeforeUpload': function(up, file) {
				            console.log("this is a beforeupload function from init");
				           
				        },
				        'UploadProgress': function(up, file) {
				        	const { tableData } = _this.state

			            const newTableData = tableData.map( item => {
			            	if (item.name == file.name) {
			            		item.progress = file.percent * 1
			            		item.loading = '正在上传'
			            	}
			            	return item
			            })
			            _this.setState({ tableData: newTableData })
				        },
				        'UploadComplete': function() {
				            console.log('上传成功')
				        },
				        'FileUploaded': function(up, file, info) {
				        	const { tableData } = _this.state
			            const res = JSON.parse(info.response);
			            let url = ""
			            if (res.key) {
			            	url = Qiniu.imageView2({
			            	       mode: 0,  // 缩略模式，共6种[0-5]
			            	       w: 400,   // 具体含义由缩略模式决定
			            	       h: 400,   // 具体含义由缩略模式决定
			            	       q: 100,   // 新图的图像质量，取值范围：1-100
			            	       format: 'png'  // 新图的输出格式，取值范围：jpg，gif，png，webp等
			            	}, res.key);
			            }
			            const newTableData = tableData.map( item => {
			            	if (item.name == file.name) {
			            		item.progress = file.percent
			            		item.loading = '上传成功'
			            		item.url = url
			            	}
			            	return item
			            })
			            
			            
			            _this.setState({ tableData: newTableData })
				        },
				        'Error': function(up, err, errTip) {
				            // $('table').show();
				            // var progress = new FileProgress(err.file, 'fsUploadProgress');
				            // progress.setError();
				            // progress.setStatus(errTip);
				        },
				       
				    }
				});
	}
	render() {
		const { tableData } = this.state
		return (
			<div>
				<Navbar brand='logo' right>
				    <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
				    <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
				    <NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
				    <NavItem href='get-started.html'><Icon>more_vert</Icon></NavItem>
				</Navbar>
				<div style={styles.buttonWraper} id="container">
					<Button floating large className='red' waves='light' icon='add' id="pickfiles" />
				</div>
				<Collection header='Upload List'>
				  <CollectionItem style={styles.collectionItem}>
				  	<span>文件名</span>
				  	<span>文件大小</span>
				  	<span>文件状态</span>
				  	<span>上传进度</span>
				  	<span><Icon>settings</Icon></span>
				  </CollectionItem>
				  {tableData.map((item, index) => (
				  	<CollectionItem key={index} style={styles.collectionItem}>
				  		<span>{item.name}</span>
				  		<span>{item.size}</span>
				  		<span>{item.loading}</span>
				  		<span style={{ width: '100px' }}>
				  			<Row >
				  			  <Col s={12}>
				  			    <ProgressBar progress={item.progress}/>
				  			  </Col>
				  			</Row>
				  		</span>
				  		<span>
				  			{ !item.url && <Icon>cancel</Icon> }
		  					{ item.url && 
		  					<Modal
		  					  header='Modal Header'
		  					  fixedFooter
		  					  trigger={
		  					    <a href="#">
		  					    	<Icon>visibility</Icon>
	  					    	</a>
		  					  }>
		  					  <Card className=''
		  					    header={<CardTitle image={item.url} waves='light'>Card Title</CardTitle>}>
		  					    I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.
		  					  </Card>
		  					</Modal>
		  				  }
			  			</span>
				  	</CollectionItem>
			  	))}
				</Collection>
				
			</div>
		)
	}
}

export default Multiple