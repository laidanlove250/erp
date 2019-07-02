/**
 * 
 */
package com.coin.erp.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author a
 *
 */
@Controller
public class ErpController {

	@RequestMapping(value = "index" , method = RequestMethod.GET)
	public String index(){
		return "index";
	}
	
	@RequestMapping(value = "m" , method = RequestMethod.GET)
	public String mIndex(){
		return "m_index";
	}
	
	/**
	 * 在线预览ENS
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/ens", method = RequestMethod.GET)
	public void pdfStreamHandler(HttpServletRequest request, HttpServletResponse response) {
        //PDF文件地址
		File file = new File("/usr/local/apps/ens/ENS.pdf");
		if (file.exists()) {
			byte[] data = null;
			FileInputStream input=null;
			try {
				input= new FileInputStream(file);
				data = new byte[input.available()];
				input.read(data);
				response.getOutputStream().write(data);
			} catch (Exception e) {
				System.out.println("pdf文件处理异常：" + e);
			}finally{
				try {
					if(input!=null){
						input.close();
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
