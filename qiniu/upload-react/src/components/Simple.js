import React from 'react'

class Upload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: [ ]
		}
	}
	componentDidMount() {
		const { tableData } = this.state
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
		    uptoken_url: '/uptoken/qiniu/uptoken',
		    // uptoken_func: function(){
		    //     var ajax = new XMLHttpRequest();
		    //     ajax.open('GET', $('#uptoken_url').val(), false);
		    //     ajax.setRequestHeader("If-Modified-Since", "0");
		    //     ajax.send();
		    //     if (ajax.status === 200) {
		    //         var res = JSON.parse(ajax.responseText);
		    //         console.log('custom uptoken_func:' + res.uptoken);
		    //         return res.uptoken;
		    //     } else {
		    //         console.log('custom uptoken_func err');
		    //         return '';
		    //     }
		    // },
		    domain: 'http://onxjs42u3.bkt.clouddn.com/',
		    get_new_uptoken: false,
		    // downtoken_url: '/downtoken',
		    // unique_names: true,
		    // save_key: true,
		    // x_vars: {
		    //     'id': '1234',
		    //     'time': function(up, file) {
		    //         var time = (new Date()).getTime();
		    //         // do something with 'time'
		    //         return time;
		    //     },
		    // },
		    auto_start: true,
		    log_level: 5,
		    init: {
		        'BeforeChunkUpload':function (up,file) {
		            console.log("before chunk upload:",file.name);
		        },
		        'FilesAdded': function(up, files) {
        				plupload.each(files, function(file) {
        					tableData.push({ title: file.name, 'progress': '等待上传', key: "1" })
        	      });
        	      _this.setState({ tableData: tableData })
		        },
		        'BeforeUpload': function(up, file) {
		            console.log("this is a beforeupload function from init");
		            // var progress = new FileProgress(file, 'fsUploadProgress');
		            // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
		            // if (up.runtime === 'html5' && chunk_size) {
		            //     progress.setChunkProgess(chunk_size);
		            // }
		        },
		        'UploadProgress': function(up, file) {
		            // var progress = new FileProgress(file, 'fsUploadProgress');
		            // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
		            // progress.setProgress(file.percent + "%", file.speed, chunk_size);
		            const newTableData = tableData.map( item => {
		            	if (item.title === file.name) {
		            		item.progress = file.percent + '%'
		            	}
		            	return item
		            })
		            _this.setState({ tableData: newTableData })
		        },
		        'UploadComplete': function() {
		            console.log('上传成功')
		        },
		        'FileUploaded': function(up, file, info) {
		            // var progress = new FileProgress(file, 'fsUploadProgress');
		            // progress.setComplete(up, info);
		            const res = JSON.parse(info.response);
		            console.log('res')
		            console.log(res)
		            let url = ""
		            if (res.url) {
		            	url = res.url
		            } else {
		            	url = up.getOption('domain') + res.key
		            }
		            const newTableData = tableData.map( item => {
		            	if (item.title === file.name) {
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
		        //指定 key, 消重功能消失, key代替原文件名
		        // html5端 默认使用id作为文件名
            // 'Key': function(up, file) {
            //     var key = "";
            //     // do something with key
            //     key = 'yaodi';
            //     return key
            // }
		    }
		});
	}
	
	render() {
		
		const { tableData } = this.state
	 	return (
			<div>
				<h3>upload files.</h3>
				<div id="container">
				    <a id="pickfiles" href="#" >
				        <span>选择文件</span>
				    </a>
				</div>
				<div style={{ margin: '2rem 0 0' }}>
					<ul>
						{tableData.map( (item, index) => (
							<li>
								{`${item.title} ||||||| ${item.progress}% ||||| url = ${item.url}`}
							</li>
						))}
					</ul>
				</div>
			</div>
		)
	}
}

export default Upload