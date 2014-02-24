// Js_of_ocaml toplevel runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2011 Jérôme Vouillon
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: caml_terminfo_setup
function caml_terminfo_setup () { return 1; } // Bad_term

//////////////////////////////////////////////////////////////////////

//Provides: caml_get_section_table
//Requires: caml_global_data
function caml_get_section_table () { return caml_global_data.toc; }

//Provides: caml_dynlink_get_current_libs
function caml_dynlink_get_current_libs () { return [0]; }

//Provides: caml_reify_bytecode
//Requires: caml_global_data
function caml_reify_bytecode (code, sz) {
  return eval(caml_global_data.compile(code).toString());
}

//Provides: caml_static_release_bytecode
function caml_static_release_bytecode () { return 0; }

//Provides: caml_static_alloc
//Requires: MlMakeString
function caml_static_alloc (len) { return new MlMakeString (len); }

//Provides: caml_static_free
function caml_static_free () { return 0; }

//Provides: caml_realloc_global
//Requires: caml_global_data
function caml_realloc_global (len) {
  if (len + 1 > caml_global_data.length) caml_global_data.length = len + 1;
  return 0;
}


/////////////////////////////////////////////////////////////////////////


// send mime_type display message
function caml_ml_display(mime_type, data) {
    IPython.notebook.kernel.send_mime(mime_type, data);
}

// clear display
function caml_ml_clear_display(wait,stdout,stderr,other) {
    IPython.notebook.kernel.send_clear(wait,stdout,stderr,other);
}

// print to stdout
function js_print_stdout(s) { 
    IPython.notebook.kernel.send_stdout_message(s.toString(), "stdout"); 
}

// print to stderr
function js_print_stderr(s) { 
    IPython.notebook.kernel.send_stdout_message(s.toString(), "stderr"); 
}

