import { ensureSchema, getD1 } from '@/db';

const clean=(value:unknown,max:number)=>typeof value==='string'?value.trim().slice(0,max):'';
export async function POST(request:Request){
  try{
    const body=await request.json() as Record<string,unknown>;
    if(clean(body.website,100)) return Response.json({ok:true},{status:201});
    const name=clean(body.name,80), company=clean(body.company,120), contact=clean(body.contact,160), role=clean(body.role,80), industry=clean(body.industry,80), problem=clean(body.problem,2000);
    const consent=body.consent===true;
    const diagnosticScore=Number.isFinite(Number(body.diagnosticScore))?Math.max(0,Math.min(100,Math.round(Number(body.diagnosticScore)))):null;
    const decision=['GO','ADJUST','HOLD','STOP'].includes(clean(body.decision,12))?clean(body.decision,12):null;
    const source=clean(body.source,40)||'website';
    if(!name||!company||!contact||!role||!industry||problem.length<20||!consent) return Response.json({error:'请完整填写必填项并确认隐私授权。'},{status:400});
    await ensureSchema();
    const id=crypto.randomUUID();
    await getD1().prepare(`INSERT INTO diagnostic_applications (id,created_at,name,company,contact,role,industry,problem,diagnostic_score,decision,source,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`).bind(id,Date.now(),name,company,contact,role,industry,problem,diagnosticScore,decision,source,'new').run();
    return Response.json({ok:true,id},{status:201});
  }catch(error){console.error('diagnostic application failed',error);return Response.json({error:'暂时无法提交，请稍后重试。'},{status:500});}
}
