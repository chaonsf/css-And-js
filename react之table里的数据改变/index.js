import React,{Component}from 'react';
import { Table, Input,Popconfirm,Divider,InputNumber,message,Icon,Card} from 'antd';
import './index.scss'
import Store from '@/redux/store'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

//选择诊所后会有一个比例，根据这个比例算出结算价，诊所必选，没选诊所按1算
export default class SaleDatail extends Component{
     constructor(props){
         super(props)
         this.handleSize.bind(this);
         let data=Store.getState()
         this.state={
              dataSource:[],
               clinicDiscount:data.form.clinicDISCOUNT,//选择诊所后的折扣，根据这个折扣算是结算价
               Discountratio:data.form.DISCOUNT/100, //手填的折扣比例，根据这个算是折算价
              count:{}, //合计的数据
              deskWidth:document.body.clientWidth,
         }
         this.handleStoreChange=this.handleStoreChange.bind(this)
         Store.subscribe(this.handleStoreChange)
         this.columns=[
            {
                title: '处置内容',
                dataIndex: 'SPSP_NAME',
                width: '30%',
                align:'center',
                editable: true,
               render:(text,recode)=><Input value={text} onChange={(e)=>this.handleChange({SPSP_NAME:e.target.value},recode)}></Input>
            },
            {
                title: '数量',
                dataIndex: 'SPSP_UNIT',
                width:'191px',
                align:'center',
                editable: true,
               render:(text,recode)=><InputNumber value={text} min={0} precision={0} onChange={(value)=>this.numberChange({SPSP_UNIT:value},recode)}></InputNumber>
              
            },
            {
                title: '原价',
                dataIndex: 'SPSP_AMT',
                width:'191px',
                align:'center',
                editable: true,
                render:(text,recode)=><InputNumber value={text} min={0} precision={2} onChange={(value)=>this.numberChange({SPSP_AMT:value},recode)}></InputNumber>
            },
            {
                title: '折扣价',
                dataIndex: 'SPSP_DISCOUNT_AMT',
                width:'191px',
                align:'center',
                editable:true,
                render:(text,recode)=><InputNumber value={text} min={0} precision={2} onChange={(value)=>this.numberChange({SPSP_DISCOUNT_AMT:value},recode)}></InputNumber>
            },
            {
                title:'结算价',
                dataIndex:'SPSP_SETTLE_AMT',
                width:'191px',
                align:'center',
                render:(text,recode)=><InputNumber value={text} min={0} precision={2} onChange={(value)=>this.numberChange({SPSP_SETTLE_AMT:value},recode)}></InputNumber>
            },
            {
                title:()=><div>操作<Icon type="plus" onClick={()=>this.onadd()}/></div>,
                dataIndex: 'operation',
                width:'191px',
                render:(text,recode)=><Popconfirm title="确定删除?" cancelText='取消' okText='确定' onConfirm={() => this.handleDelete(recode.id)}>
                <span style={{color:'red'}} >删除</span>
              </Popconfirm>
            }
         ]
     }
     handleSize = () => {
        this.setState({
           deskWidth:document.body.clientWidth,
        }) 
     }
    componentWillUnmount(){
        window.removeEventListener('resize',this.handleSize);
     }
     componentDidMount(){
        window.addEventListener('resize', this.handleSize);
         let {dataSource,Discountratio}=this.state;
        // let {Discountratio}=this.props
         if(!Discountratio){
            Discountratio=1
        }
            let array=dataSource
          array.forEach(item=>{
               item.SPSP_DISCOUNT_AMT=item.SPSP_AMT*Discountratio.toFixed(2)
          })
          let obj=this.calculation(array)
          this.setState({
               dataSource:array,
               count:obj
          })
     }
     loadData(data){
         let obj=this.calculation(data)
         for(let i=0;i<data.length;i++){
              data[i].id='a'+Math.random()
         }
        this.setState({
            dataSource:data,
            count:obj
        })
     }
     handleStoreChange(){
           let data=Store.getState()
           this.setState({
            clinicDiscount:data.form.clinicDISCOUNT,
            Discountratio:data.form.DISCOUNT/100,
          },()=>{
              this.settle()
          })
     }
     settle(){  //更换诊所,折扣比例后重新计算结算价
       //  let {clinicDiscount,Discountratio}=this.props
         let {dataSource,clinicDiscount,Discountratio}=this.state
         let array=dataSource
         array.forEach(item=>{
             if(clinicDiscount){
                item.SPSP_SETTLE_AMT=(item.SPSP_AMT*clinicDiscount).toFixed(2)
             }
              if(Discountratio){
                item.SPSP_DISCOUNT_AMT=(item.SPSP_AMT*Discountratio).toFixed(2)
              }
         })
         let obj=this.calculation(array)
         this.setState({
              dataSource:array,
              count:obj
         })

     }
     handleChange(value,recode){
        this.onChange(value,recode)
     }
     numberChange(value,recode){
        this.onChange(value,recode)
     }
     onChange(value,recode){
       // let {Discountratio,clinicDiscount}=this.props
       let {Discountratio,clinicDiscount}=this.state
        if(!Discountratio){
            Discountratio=1
        }
        if(!clinicDiscount){
            clinicDiscount=1
        }
        for(var i in value){
            if(i==='SPSP_AMT'){
                 recode['SPSP_DISCOUNT_AMT']=Discountratio*value[i]
                 recode['SPSP_SETTLE_AMT']=clinicDiscount*value[i]
            }
            recode[i]=value[i]
            this.setState({
                dataSource: this.state.dataSource.map((item, key) => item.id===recode.id ? {...item, [i]: value[i]} : item)
            },()=>{
                    let obj=this.calculation()
                     this.setState({
                          count:obj
                     })
                    
            })
        }
     }
     handleDelete(recode){
          let {dataSource}=this.state;
            let array=dataSource.filter(item=>{
                return item.id!==recode
           })
            let obj=this.calculation(array)
            this.setState({
                 dataSource:array,
                 count:obj
            })
     }
     calculation(data){
         let {dataSource}=this.state;
         let array=data?data:dataSource
         let num=0,SPSP_DISCOUNT_AMT=0,SPSP_AMT=0,SPSP_SETTLE_AMT=0
         array.forEach((item,index)=>{
                 if(item.SPSP_UNIT){
                    num+=parseInt(item.SPSP_UNIT);
                    if(item.SPSP_DISCOUNT_AMT){
                        SPSP_DISCOUNT_AMT+=item.SPSP_UNIT*item.SPSP_DISCOUNT_AMT
                    }
                    if(item.SPSP_AMT){
                        SPSP_AMT+=item.SPSP_UNIT*item.SPSP_AMT
                    }
                    if(item.SPSP_SETTLE_AMT){
                        SPSP_SETTLE_AMT+=item.SPSP_UNIT*item.SPSP_SETTLE_AMT
                    }
                 }      
         })
         let obj={SPSP_NAME:'合计',SPSP_UNIT:num,SPSP_DISCOUNT_AMT:SPSP_DISCOUNT_AMT.toFixed(2),SPSP_AMT:SPSP_AMT.toFixed(2),SPSP_SETTLE_AMT:SPSP_SETTLE_AMT.toFixed(2),id:'count'}
          return obj
     }
     onadd(){
        console.log('state:',this.state)
          let {dataSource}=this.state
           let array=dataSource;
           let obj=this.calculation()
           array.unshift({SPSP_NAME:'',SPSP_UNIT:1,SPSP_DISCOUNT_AMT:'',id:'a'+Math.random(),SPSP_AMT:'',SPSP_SETTLE_AMT:''})
          this.setState({
             dataSource:array,
             count:obj
          })
       //   let {clinicDiscount,Discountratio}=this.props;
         // console.log(clinicDiscount,Discountratio)
     }
     render(){
         const {dataSource,count,deskWidth}=this.state
         return(
             <div className='saledetail'>
                <Divider>方案明细</Divider>
                <div className='count'>
                  <span className='label'><strong>数量</strong><span>{count.SPSP_UNIT}</span></span>/
                  <span className='label'><strong>原价</strong><span>{count.SPSP_AMT}</span></span>/
                   <span className='label'><strong>折扣价</strong><span>{count.SPSP_DISCOUNT_AMT}</span></span>/
                   <span className='label'><strong>结算价</strong><span>{count.SPSP_SETTLE_AMT}</span></span>
                     {deskWidth<=900?(<Icon type='plus' onClick={this.onadd.bind(this)}></Icon>):null}
                   </div>
                {deskWidth<=900?(
                  <div>
                                       {dataSource.map((item,index)=>
                                            <Card key={index}>
                                                <Popconfirm title="确定删除?" cancelText='取消' okText='确定' onConfirm={() => this.handleDelete(item.id)}>
                                                   <Icon type='delete'></Icon>
                                                </Popconfirm>
                                                <Input addonBefore='处置内容' value={item.SPSP_NAME} onChange={(e)=>this.handleChange({SPSP_NAME:e.target.value},item)}></Input>
                                                <div className='payway'>
                                                   <span className='ant-input-group-addon'>数量</span>
                                                   <InputNumber min={0} max={100} precision={0} value={item.SPSP_UNIT} onChange={(value)=>this.numberChange({SPSP_UNIT:value},item)}></InputNumber>
                                                </div>
                                                <div className='payway'>
                                                   <span className='ant-input-group-addon'>原价</span>
                                                   <InputNumber min={0}  precision={2} value={item.SPSP_AMT} onChange={(value)=>this.numberChange({SPSP_AMT:value},item)}></InputNumber>
                                                </div>
                                                <div className='payway'>
                                                   <span className='ant-input-group-addon'>折扣价</span>
                                                   <InputNumber min={0}  precision={2} value={item.SPSP_DISCOUNT_AMT} onChange={(value)=>this.numberChange({SPSP_DISCOUNT_AMT:value},item)}></InputNumber>
                                                </div>
                                                <div className='payway'>
                                                   <span className='ant-input-group-addon'>结算价</span>
                                                   <InputNumber min={0}  precision={2} value={item.SPSP_SETTLE_AMT} onChange={(value)=>this.numberChange({SPSP_SETTLE_AMT:value},item)}></InputNumber>
                                                </div>
                                            </Card>
                                          )}
                  </div>
                ):(
                  <Table columns={this.columns} dataSource={dataSource} rowKey={(recode,index)=>index} pagination={false}>
            
                  </Table>
                )}

             </div>
         )
     }
}
