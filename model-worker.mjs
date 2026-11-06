import {WebWorkerMLCEngineHandler} from 'https://esm.sh/@mlc-ai/web-llm@0.2.87';

const handler = new WebWorkerMLCEngineHandler();
self.onmessage = event => handler.onmessage(event);
